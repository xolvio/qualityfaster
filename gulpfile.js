const gulp = require('gulp'),
  path = require('path'),
  mocha = require('gulp-spawn-mocha'),
  karmaServer = require('karma').Server,
  Chimp = require('chimp'),
  runSequence = require('run-sequence'),
  karmaOptions = require('./config/karma.options'),
  mochaOptions = require('./config/mocha.options'),
  chimpOptions = require('./config/chimp.options');

gulp.task('karma', function (done) {
  new karmaServer(karmaOptions, done).start();
});

gulp.task('watchKarma', function () {
  console.log('Karma is running in watch mode');
  karmaOptions.singleRun = false;
  gulp.start('karma');
});

gulp.task('mocha', function () {
  return gulp.src(mochaOptions.files, {read: false})
    .pipe(mocha(mochaOptions));
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
  const chimpDefaultOptions = require(path.resolve(process.cwd() + '/node_modules/chimp/dist/bin/default.js'));
  chimpOptions._ = [];
  const options = Object.assign({}, chimpDefaultOptions, chimpOptions);
  var chimp = new Chimp(options);
  chimp.init(done);
});

gulp.task('watchChimp', function () {
  console.log('Chimp is running in watch mode');
  chimpOptions.watch = true;
  gulp.start('chimp');
});

gulp.task('default', ['watchMocha', 'watchKarma', 'watchChimp']);

gulp.task('test', function (done) {
  runSequence('mocha', 'karma', 'chimp', function(error) {
    if (error) {
      console.error(error.message);
      process.exit(1);
    } else {
      process.exit(0);
    }
    done();
  });
});
