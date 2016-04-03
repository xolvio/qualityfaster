var path = require('path');
var fs = require('fs');

var basePath = path.resolve(__dirname);

module.exports = function (config) {
  var babelSettings = { presets: ['react', 'es2015', 'stage-0'] };
  babelSettings.plugins = ['transform-decorators-legacy'];

  var webpackConfig = {
    resolve: {
      root: path.join(basePath, 'src', 'imports'),
      extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          query: babelSettings,
          exclude: /node_modules/
        },
        { test: /\.json$/, loader: 'json-loader' }
      ]
    },
    devtool: 'inline-source-map'
  };


  var packageStubs = fs.readdirSync('src/imports/testing/client/stubs')
    .map(function (fileName) {
      return 'packages/' + fileName;
    });

  var appManifest = require(path.resolve(basePath, './src/.meteor/local/build/programs/web.browser/program.json')).manifest;
  var meteorPackageFiles = appManifest
    .filter(function (file) {
      return file.type === 'js' && file.path.startsWith('packages/') &&
        [

        ].indexOf(file.path) === -1;
    })
    .map(function (file) {
      var basePath = packageStubs.indexOf(file.path) !== -1 ?
        'src/imports/testing/client/stubs' :
        'src/.meteor/local/build/programs/web.browser';
      return {pattern: path.join(basePath, file.path)};
    });


  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'src/.meteor/local/build/programs/web.browser/merged-stylesheets.css',
      'src/imports/testing/client/__meteor_runtime_config__.js',
    ].concat(
      meteorPackageFiles,
      [
        {pattern: 'src/imports/testing/_support/**/*.@(js|jsx)'},
        {pattern: 'src/imports/**/*-spec.@(js|jsx)'},
      ]
    ),

    // list of files to exclude
    exclude: [
      'src/imports/**/server/**/*-spec.@(js|jsx)',
      '**/*.md'
    ],

    // pre-process matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/**/*.@(js|jsx)': ['webpack', 'sourcemap'],
      'src/imports/**/*.@(js|jsx)': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    customLaunchers: {
      Chrome_CI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });

  if (process.env.CI || process.env.TRAVIS || process.env.CIRCLECI) {
    // FIXME Travis / Circle don't seem to run Karma + Chrome, yet Chrome works with Chimp :/
    //config.browsers = ['Chrome_CI', 'Firefox'];
    config.browsers = ['Firefox'];
    config.singleRun = true;
  } else {
    config.browsers = ['Chrome'];
  }

};
