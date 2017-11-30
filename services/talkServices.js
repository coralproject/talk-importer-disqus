// Some modules in Talk source have side effects when required. In particular
// the translation files required in services/i18n.js are assumed to be relative
// to the current working directory. In order to maintain this behavior we
// change the working directory to the Talk submodule, so requiring files
// referenced from the Talk source don't encounter an error.
const path = require('path');
const cwd = process.cwd();
process.chdir(path.resolve(`${__dirname}/talk`));

const commentService = require('./talk/services/comments');
const userService = require('./talk/services/users');
const assetService = require('./talk/services/assets');
const actionService = require('./talk/services/actions');
const commentModel = require('./talk/models/comment');

// Return CWD to original value.
process.chdir(path.resolve(cwd));

module.exports = {
  commentService,
  userService,
  assetService,
  actionService,
  commentModel
};
