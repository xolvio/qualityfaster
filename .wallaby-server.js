const _ = require("underscore");
const path = require("path");

module.exports = function (wallaby) {
  return {
    files: [
      'src/imports/**/*.js',
      {pattern: 'src/imports/**/*spec.js', ignore: true},
      {pattern: 'src/imports/*(browser|ui)*', ignore: true},
      {pattern: 'src/imports/@(browser|ui)/**/*.js', ignore: true},
    ],
    tests: [
      'src/imports/**/*spec.js',
      {pattern: 'src/imports/*(browser|ui)*', ignore: true},
      {pattern: 'src/imports/@(browser|ui)/**/*.js', ignore: true},
    ],
    preprocessors: {
      '**/*.js': wallaby.compilers.babel({
        presets: ['es2015']
      })
    },
    env: {
      type: 'node',
      runner: path.resolve(process.env.HOME, '.nvm/versions/node/v6.3.0/bin/node'),
    },
    setup: function () {
      require(wallaby.localProjectDir + '/config/mocha.bootstrap.js');
    }
  }
};
