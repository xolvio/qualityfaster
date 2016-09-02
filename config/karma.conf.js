// See here for the full docs: http://karma-runner.github.io/1.0/config/configuration-file.html
module.exports = function (config) {
  config.set({
    basePath: '..',              // the directory from which to resolve other paths in this config file
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
    reporters: ['mocha'],    // use chrome locally, but test on Firefox on CI by overriding this variable
    port: 9876,                 // tells karma the port to use for its server, which is used to manage the browsers
    colors: true,               // for a spicy look
    logLevel: config.LOG_ERROR, //
    autoWatch: true,
    browsers: ['Chrome'],       // Use Chrome locally. We can add Firefox on CI by overriding this variable on the CLI
    singleRun: false,           // In local development mode, this is false. But we override it on CI
    concurrency: Infinity       // The number of browsers Karma is allows to open for parallelism
  })
};
