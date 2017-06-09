require('lazy-ass');
var check = require('check-more-types');
var folders = require('..');

la(check.object(folders), 'expected folders to be an object', folders);
la(check.fn(folders.to), 'expected folders.to to be a function', folders);

folders.to(__dirname)
  .then(folders.back)
  .then(folders.to(__dirname))
  .then(folders.from)
  .then(folders.to(__dirname))
  .then(function () {
    return 'foo';
  })
  .tap(folders.back)
  .then(function (result) {
    la(result === 'foo', 'incorrect result', result);
  })
  .done();
