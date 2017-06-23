#!/usr/bin/env node

/**
 * Module dependencies.
 */

const program = require('./commander');

const Strategy = require('./services/strategy');
const Sponge = require('./services/sponge');

const mongoose = require('./services/talk/services/mongoose');

const Disqus = require('./services/disqus');
const Wapo = require('./services/wapo');

const util = require('./util');

const fs = require('fs');
const async = require('async');

// Register the shutdown criteria.
util.onshutdown([
  () => mongoose.disconnect()
]);

function factory(strategy) {
  switch(strategy.name){
  case 'Washington Post':
    return new Wapo(strategy.service);
  case 'Disqus':
    return new Disqus(strategy.service);
  default:
    console.log(`We do not have any driver for that mapping file ${strategy.name}.`)
  }
}

/**
* Import comments into the database.
*/
async function importComments(file) {
  
  // Get strategy the strategy use.
  const strategy = new Strategy(file);
  
  // Connect to Source.  
  const source = factory(strategy.data);
  
  // Get the transformation tool going.
  const sponge = new Sponge(strategy.data, source);
  
  console.info(`Importing comments from ${strategy.data.name}.`);

  let resolve = Promise.resolve();
  
  source.get_comments(strategy.data.service.forum)
  .then(posts => {
    for (let i in posts) {
      let post = posts[i];
      resolve = resolve.then(() => {
        return sponge.translate(post, 'comments')
      })
      .catch((error) => {
        console.log(`Error on translating post. ${error}`)
      });
    }

    resolve.then(() => {
      console.log(`Success importing ${posts == undefined ? 0 : posts.length} comments for ${strategy.data.name}.`);
      util.shutdown();
    })
    .catch((error) => {
      console.log('Error translating or importing comments. ', error);
      util.shutdown(1);
    });

  })
  .catch(error => {
    console.log('Error getting comments from the Source. ', error);
    util.shutdown(1);
  });
}

//==============================================================================
// Setting up the program command line arguments.
//==============================================================================

program
  .command('import <file>')
  .description('import comments into database via strategy file')
  .action(importComments);

program.parse(process.argv);

// If there is no command listed, output help.
if (!process.argv.slice(2).length) {
  program.outputHelp();
  util.shutdown();
}
