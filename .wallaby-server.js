module.exports = (wallaby) => {
  const path = require('path');
  return {
    debug: false,
    testFramework: 'mocha',
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
    compilers: {'**/*.js': wallaby.compilers.babel()},
    env: {type: 'node'},
    workers: {initial: 1, regular: 1, recycle: true},
    setup: () => {
      wallaby.testFramework.addFile(`${wallaby.localProjectDir}/config/mocha.bootstrap.js`);
    },
  }
};
