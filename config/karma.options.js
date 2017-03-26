const DEBUG = process.env.DEBUG === 'true' || process.env.DEBUG === '1',
  CI = process.env.CI === 'true' || process.env.CI === '1';

module.exports = {
  basePath: '.',              // the directory from which to resolve other paths in this config file
  frameworks: [
    'mocha',                  // We use Mocha as our test framework
    'chai',                   // makes the assertion library present in tests without needing to require it
    'browserify',             // allows us to use require/import in the browser
    'source-map-support'      // allows us to see which source lines are cause failures when they occur
  ],
  files: [                    // the order in which to load the source and test files
    'src/imports/adaptors/web/**/*.js'
  ],
  exclude: [                  // since karma is a front-end only testing framework, we ignore server directories
    'src/**/server/**',
    '**/*.html',
    '**/*.md',
    'src/node_modules/**'
  ],
  client: {
    useIframe: false
  },
  preprocessors: {            // uses browserify to transform files before the browser loads them
    'src/**/*.js': ['browserify'],
  },
  browserify: {
    debug: true,              // needed for the source-map-support plugin to work
    transform: ['babelify']   // allows us to use ES6
  },
  port: 9876,                 // tells karma the port to use for its server, which is used to manage the browsers
  logLevel: DEBUG ? 'DEBUG' : 'ERROR',
  autoWatch: !CI,

  singleRun: true,           // tells karma to either watch the file system or run a single test run
  concurrency: Infinity,       // The number of browsers Karma is allows to open for parallelism

  // When running locally we want a low-noise reporter in watch mode, but on CI we want to see the full report
  reporters: CI ? 'mocha' : 'dots',
  // the browser to run the test in. We can add many here, and on CI we are adding Firefox
  browsers: CI ? ['Chrome', 'Firefox'] : ['Chrome']
};
