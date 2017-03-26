module.exports = function (wallaby) {
  const wallabify = require('wallabify');
  const postprocessor = wallabify({
    entryPatterns: [
      'config/mocha.bootstrap.js',
      'src/imports/ui/**/*spec.js'
    ]
  });
  return {
    debug: false,
    testFramework: 'mocha',
    files: [
      {pattern: 'config/mocha.bootstrap.js', load: false, instrument: false},
      {pattern: 'src/imports/ui/**/*.js', load: false},
      {pattern: 'src/imports/ui/**/*spec.js', ignore: true},
    ],
    tests: [
      {pattern: 'src/imports/ui/**/*spec.js', load: false},
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
