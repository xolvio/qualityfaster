const _ = require("underscore");
const path = require("path");

const wallabify = require('wallabify');
const wallabyPostprocessor = wallabify({});

module.exports = function () {
  return {
    files: [
      {pattern: 'node_modules/chai/chai.js', instrument: false},
      {pattern: 'src/imports/**/*.js', load: false},
      {pattern: 'src/imports/**/*spec.js', ignore: true},
      {pattern: 'src/imports/*(server)*', ignore: true},
      {pattern: 'src/imports/@(server)/**/*.js', ignore: true},
    ],
    tests: [
      {pattern: 'src/imports/**/*spec.js', load: false},
      {pattern: 'src/imports/*(server)*', ignore: true},
      {pattern: 'src/imports/@(server)/**/*.js', ignore: true},
    ],
    env: {
      runner: require('phantomjs-prebuilt').path,
      params: {runner: '--web-security=false'}
    },
    postprocessor: wallabyPostprocessor,
    setup: function () {
      window.assert = chai.assert;
      window.expect = chai.expect;
      chai.should();
      window.__moduleBundler.loadTests();
    }
  }
};
