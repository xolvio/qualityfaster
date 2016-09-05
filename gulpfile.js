const gulp = require('gulp'),
  path = require('path'),
  mocha = require('gulp-spawn-mocha'),
  karmaServer = require('karma').Server,
  Chimp = require('chimp'),
  runSequence = require('run-sequence');


const DEBUG = process.env.DEBUG === 'true' || process.env.DEBUG === '1',
  CI = process.env.CI === 'true' || process.env.CI === '1';

const mochaFiles = ['!src/imports/{browser,ui}{,/**}', '!src/imports/**/*{browser,ui}*spec.js', 'src/imports/**/*spec.js'];

const mochaConfig = {
  compilers: 'babel-core/register',
  require: 'config/mocha.bootstrap.js',
  reporter: CI ? 'spec' : 'dot'
};

const karmaConfig = {
  basePath: '.',              // the directory from which to resolve other paths in this config file
  frameworks: [
    'mocha',                  // We use Mocha as our test framework
    'chai',                   // makes the assertion library present in tests without needing to require it
    'browserify',             // allows us to use require/import in the browser
    'source-map-support'      // allows us to see which source lines are cause failures when they occur
  ],
  files: [                    // the order in which to load the source and test files
    'src/**/*.js'
  ],
  exclude: [                  // since karma is a front-end only testing framework, we ignore server directories
    'src/**/server/**',
    '**/*.md'
  ],
  preprocessors: {            // uses browserify to transform files before the browser loads them
    'src/**/*.js': ['browserify'],
  },
  browserify: {
    debug: true,              // needed for the source-map-support plugin to work
    transform: ['babelify']   // allows us to use ES6
  },
  port: 9876,                 // tells karma the port to use for its server, which is used to manage the browsers
  logLevel: DEBUG ? 'DEBUG' : 'ERROR',
  autoWatch: true,

  singleRun: true,           // tells karma to either watch the file system or run a single test run
  concurrency: Infinity,       // The number of browsers Karma is allows to open for parallelism

  //
  reporters: CI ? 'mocha' : 'dots',
  // the browser to run the test in. We can add many here, and on CI we are adding Firefox
  browsers: CI ? ['Chrome', 'Firefox'] : ['Chrome']
};

const chimpConfig = {
  path: 'tests',
  browser: 'phantomjs',
  timeout: 60000,
  port: 2345,
  domainSteps: 'tests/step_definitions/domain',
  criticalSteps: 'tests/step_definitions/critical',
  watchSource: 'src/imports',
};

gulp.task('karma', function (done) {
  new karmaServer(karmaConfig, done).start();
});

gulp.task('watchKarma', function () {
  console.log('Karma is running in watch mode');
  karmaConfig.singleRun = false;
  gulp.start('karma');
});

gulp.task('mocha', function () {
  return gulp.src(mochaFiles, {read: false})
    .pipe(mocha(mochaConfig));
});

gulp.task('watchMocha', function () {
  console.log('Mocha is running in watch mode');
  gulp.start('mocha');
  gulp.watch('src/imports/**/*.js', function (event) {
    if (!event.path.match(/browser|ui/)) {
      gulp.start('mocha');
    }
  });
});

gulp.task('chimp', function (done) {
  const chimpDefaultConfig = require(path.resolve(process.cwd() + '/node_modules/chimp/dist/bin/default.js'));
  chimpConfig._ = [];
  const options = Object.assign({}, chimpDefaultConfig, chimpConfig);
  var chimp = new Chimp(options);
  chimp.init(function () {
    done();
  });
});

gulp.task('watchChimp', function () {
  console.log('Chimp is running in watch mode');
  chimpConfig.watch = true;
  gulp.start('chimp');
});

gulp.task('default', ['watchMocha', 'watchKarma', 'watchChimp']);

// gulp.task('test', ['mocha', 'karma', 'chimp'], function() {
gulp.task('test', function (done) {
  runSequence('mocha', 'karma', 'chimp', done);
});
