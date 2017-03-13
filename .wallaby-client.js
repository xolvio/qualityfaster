const path = require('path');

module.exports = function (wallaby) {
  const wallabify = require('wallabify');
  const postprocessor = wallabify({
    entryPatterns: [
      'config/mocha.bootstrap.js',
      'src/imports/**/*spec.js'
    ]
  });

  return {
    debug: false,
    testFramework: 'mocha',
    files: [
      {pattern: 'config/mocha.bootstrap.js', load: false, instrument: false},
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
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    env: {
      kind: 'electron'
    },
    postprocessor: postprocessor,
    setup: () => {
      window.__moduleBundler.loadTests();
    }
  }
};
