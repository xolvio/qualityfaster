//module.exports = function () {
//  return {
//    files: [
//      {pattern: 'tests/components/_support/**', instrument: true},
//      {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
//      'src/client/**'
//    ],
//    tests: [
//      'tests/components/ui/**'
//    ],
//    testFramework: 'jasmine',
//    preprocessors: {
//      '**/*.jsx': file => require('react-tools').transformWithDetails(file.content, {sourceMap: true, harmony: true})
//    }
//  };
//};


var wallabify = require('wallabify');
var wallabyPostprocessor = wallabify({
     // browserify options, such as
     // insertGlobals: false
   }
   // you may also pass an initializer function to chain other
   // browserify options, such as transformers
   // , b => b.exclude('mkdirp').transform(require('babelify'))
);

//var _ = require('underscore');
var path = require('path');
//var webpack = require('webpack');
//var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel-core');

module.exports = function (wallaby) {

  var babelCompiler = wallaby.compilers.babel({
    babel: babel,
    presets: ['react', 'es2015', 'stage-0'],
    plugins: ['transform-decorators-legacy', 'transform-strict-mode', 'transform-es2015-modules-commonjs'],
  });

  //var appManifest = require('./src/.meteor/local/build/programs/web.browser/program.json').manifest;
  //var meteorPackageFiles = appManifest
  //   .filter(function (file) {
  //     return file.type === 'js' && file.path.startsWith('packages/');
  //   })
  //   .map(function (file) {
  //     return {
  //       pattern: path.join('src/.meteor/local/build/programs/web.browser', file.path),
  //       instrument: false,
  //     };
  //   });

  return {
    // set `load: false` to all source files and tests processed by webpack
    // (except external files),
    // as they should not be loaded in browser,
    // their wrapped versions will be loaded instead
    files: [
      //{pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
      //'tests/components/_support/__meteor_runtime_config__.js',
    ].concat(
       //meteorPackageFiles,
       [
         {pattern: 'tests/components/_support/**', instrument: true},
         {pattern: 'src/modules/**/*.@(js|jsx)', load: false},
         //{pattern: 'src/modules/*/server/**/*.@(js|jsx)', ignore: true, load: false},
       ]
    ),
    tests: [
      {pattern: 'tests/**/*-spec.@(js|jsx)'},
      //{pattern: 'tests/quarantine/**/*.@(js|jsx)', ignore: true},
      {pattern: 'tests/**/server/**/*-spec.@(js|jsx)', ignore: true},
    ],

    compilers: {
      'src/**/*.@(js|jsx)': babelCompiler,
      'tests/**/*.@(js|jsx)': babelCompiler,
    },

    postprocessor: wallabyPostprocessor,

    env: {
      type: 'browser',
      runner: './node_modules/.bin/phantomjs',
    },

    debug: true,

    testFramework: 'jasmine'
  };
};






