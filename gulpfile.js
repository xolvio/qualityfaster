const gulp = require('gulp'),
  path = require('path'),
  mocha = require('gulp-spawn-mocha'),
  karmaServer = require('karma').Server,
  Chimp = require('chimp'),
  ProcessManager = require('./process-manager'),
  processManager = new ProcessManager(),
  extend = require('util')._extend,
  runSequence = require('run-sequence'),
  karmaOptions = require('./config/karma.options'),
  mochaServerOptions = require('./config/mocha.server.options'),
  chimpDomainOptions = require('./config/chimp.domain.options'),
  chimpE2EOptions = require('./config/chimp.e2e.options');

// TODO remove this smelly code. The real issue is that Chimp should exit without hogging the process
let finishShouldWaitForParam = false;
function finish(done, exitParam) {
  return function (error) {
    if (error) {
      console.error(error);
    }
    if (!finishShouldWaitForParam || (finishShouldWaitForParam && exitParam)) {
      processManager.killAll();
      process.exit(!!error)
    }
    done(error);
  }
}

gulp.task('clientUnit', function (done) {
  new karmaServer(karmaOptions, done).start();
});

gulp.task('watchClientUnit', function () {
  console.log('Karma is running in watch mode'.white);
  karmaOptions.singleRun = false;
  gulp.start('clientUnit');
});

gulp.task('serverUnit', function () {
  return gulp.src(mochaServerOptions.files, {read: false})
    .pipe(mocha(mochaServerOptions));
});

gulp.task('watchServerUnit', function () {
  console.log('Mocha is running in watch mode'.white);
  gulp.start('serverUnit');
  gulp.watch(mochaServerOptions.watchDir, function (event) {
    if (!event.path.match(/browser|ui|web/)) {
      gulp.start('serverUnit');
    }
  });
});

gulp.task('domain', function (done) {
  const chimpDefaultOptions = require(path.resolve(process.cwd() + '/node_modules/chimp/dist/bin/default.js'));
  chimpDomainOptions._ = [];
  const options = Object.assign({}, chimpDefaultOptions, chimpDomainOptions);
  const chimp = new Chimp(options);
  chimp.init(finish(done));
});

gulp.task('watchDomain', function () {
  chimpDomainOptions.watch = true;
  gulp.start('domain');
});

gulp.task('endToEnd', ['startApplicationServer'], function (done) {
  const chimpDefaultOptions = require(path.resolve(process.cwd() + '/node_modules/chimp/dist/bin/default.js'));
  chimpE2EOptions._ = [];
  const options = Object.assign({}, chimpDefaultOptions, chimpE2EOptions);
  process.env.DEBUG = 'true';
  const chimp = new Chimp(options);
  chimp.init(finish(done));
});

gulp.task('watchEndToEnd', function () {
  chimpE2EOptions.watch = true;
  gulp.start('endToEnd');
});

gulp.task('default', ['watchServerUnit', 'watchClientUnit', 'watchDomain', 'watchEndToEnd']);

gulp.task('test', function (done) {
  finishShouldWaitForParam = true;
  runSequence('serverUnit', 'clientUnit', 'domain', 'endToEnd', finish(done, true));
});

gulp.task('startApplicationServer', function (done) {
  const srcDir = path.resolve(__dirname, 'src');
  processManager.startProcess({
    name: 'Meteor App',
    command: `meteor --settings ${srcDir}/settings.json --port 3000`,
    waitForMessage: 'App running at',
    options: {
      cwd: srcDir,
      env: extend({
        ROOT_URL: 'http://localhost:3000'
      }, process.env)
    }
  }, done);
});
