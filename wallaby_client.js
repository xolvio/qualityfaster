var _ = require('underscore');
var path = require('path');
var fs = require('fs');
var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel-core');

module.exports = function (wallaby) {

  var webpackConfig = {
    resolve: {
      root: path.join(wallaby.projectCacheDir, 'src', 'imports'),
      extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
      loaders: [
        // JavaScript is handled by the Wallaby Babel compiler
        { test: /\.json$/, loader: 'json-loader' }
      ]
    }
  };

  var wallabyPostprocessor = wallabyWebpack(webpackConfig);


  var babelCompiler = wallaby.compilers.babel({
    babel: babel,
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['transform-decorators-legacy'],
  });

  var packageStubs = fs.readdirSync('./src/imports/testing/client/stubs')
    .map(function (fileName) {
      return 'packages/' + fileName;
    });

  var appManifest = require(path.resolve('./src/.meteor/local/build/programs/web.browser/program.json')).manifest;
  var meteorPackageFiles = appManifest
    .filter(function (file) {
      return file.type === 'js' && file.path.startsWith('packages/') &&
        [

        ].indexOf(file.path) === -1;
    })
    .map(function (file) {
      var basePath = packageStubs.indexOf(file.path) !== -1 ?
        'tests/client/stubs' :
        'src/.meteor/local/build/programs/web.browser';
      return {pattern: path.join(basePath, file.path)};
    });

  return {
    // set `load: false` to all source files and tests processed by webpack
    // (except external files),
    // as they should not be loaded in browser,
    // their wrapped versions will be loaded instead
    files: [
      'src/.meteor/local/build/programs/web.browser/merged-stylesheets.css',
      'src/imports/testing/client/__meteor_runtime_config__.js',
    ].concat(
       meteorPackageFiles,
       [
         {pattern: 'src/imports/testing/_support/**', load: false},
         {pattern: 'src/imports/**/*.@(js|jsx)', load: false},
         {pattern: 'src/imports/**/*-spec.@(js|jsx)', ignore: true},
         {pattern: 'src/imports/**/server/**/*.@(js|jsx)', ignore: true},
       ]
    ),
    tests: [
      {pattern: 'src/imports/**/*-spec.@(js|jsx)', load: false},
      {pattern: 'src/imports/**/server/**/*-spec.@(js|jsx)', ignore: true},
    ],

    compilers: {
      // Important: Make sure that src/.meteor/ is excluded from the pattern
      'src/imports/**/*.@(js|jsx)': babelCompiler,
      'tests/**/*.@(js|jsx)': babelCompiler,
    },

    postprocessor: wallabyPostprocessor,

    bootstrap: function () {
      // required to trigger test loading
      window.__moduleBundler.loadTests();
    },

    env: {
      type: 'browser',
      runner: require('phantomjs').path,
    },

    testFramework: 'jasmine',

    debug: true,
  };
};






