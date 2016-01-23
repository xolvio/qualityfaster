require('babel-register')({
  presets: ['react', 'es2015', 'stage-0'],
  plugins: ['transform-decorators-legacy']
});

var path = require('path');

if (!process.env.ROOT_URL) {
  process.env.ROOT_URL = 'http://localhost:3000/';
}
if (!process.env.MONGO_URL) {
  process.env.MONGO_URL = 'mongodb://127.0.0.1:27017/jasmine-server';
}

var basePath = path.resolve(__dirname, '..');
process.chdir(basePath);
var serverAppPath = path.resolve(basePath, 'src/.meteor/local/build/programs/server');

var Fiber = require('fibers');
var fs = require('fs');
var Future = require('fibers/future');
var _ = require('underscore');

var files = require(path.resolve(serverAppPath, './mini-files.js'));

// read our control files
var serverJsonPath = path.resolve(serverAppPath, 'program.json');
process.argv[2] = serverJsonPath;
var serverDir = path.dirname(serverJsonPath);
var serverJson = JSON.parse(fs.readFileSync(serverJsonPath, 'utf8'));
var configJson =
  JSON.parse(fs.readFileSync(path.resolve(serverDir, 'config.json'), 'utf8'));

// Set up environment
global.__meteor_bootstrap__ = {
  startupHooks: [],
  serverDir: serverDir,
  configJson: configJson };
global.__meteor_runtime_config__ = { meteorRelease: configJson.meteorRelease };


// connect (and some other NPM modules) use $NODE_ENV to make some decisions;
// eg, if $NODE_ENV is not production, they send stack traces on error. connect
// considers 'development' to be the default mode, but that's less safe than
// assuming 'production' to be the default. If you really want development mode,
// set it in your wrapper script (eg, run-app.js).
if (!process.env.NODE_ENV)
  process.env.NODE_ENV = 'production';

var excludedPackages = [
  'packages/sanjo_karma.js',
  'packages/sanjo_long-running-child-process.js',
  'packages/velocity_chokidar.js',
  'packages/velocity_console-reporter.js',
  'packages/velocity_core.js',
  'packages/velocity_meteor-internals.js',
  'packages/velocity_meteor-stubs.js',
  'packages/velocity_shim.js',
  'packages/velocity_source-map-support.js',
  'packages/xolvio_jasmine-server-integration.js',
];
var shouldLoadPackage = function (fileInfo) {
  return fileInfo.path.indexOf('packages/') === 0 &&
    !_.contains(excludedPackages, fileInfo.path);
};

Fiber(function () {
  _.each(serverJson.load, function (fileInfo) {
    if (!shouldLoadPackage(fileInfo)) {
      return;
    }

    var code = fs.readFileSync(path.resolve(serverDir, fileInfo.path));

    var Npm = {
      /**
       * @summary Require a package that was specified using
       * `Npm.depends()`.
       * @param  {String} name The name of the package to require.
       * @locus Server
       * @memberOf Npm
       */
      require: function (name) {
        if (!fileInfo.node_modules) {
          return require(name);
        }

        var nodeModuleBase = path.resolve(serverDir,
          files.convertToOSPath(fileInfo.node_modules));
        var nodeModuleDir = path.resolve(nodeModuleBase, name);

        // If the user does `Npm.require('foo/bar')`, then we should resolve to
        // the package's node modules if `foo` was one of the modules we
        // installed.  (`foo/bar` might be implemented as `foo/bar.js` so we
        // can't just naively see if all of nodeModuleDir exists.
        if (fs.existsSync(path.resolve(nodeModuleBase, name.split("/")[0]))) {
          return require(nodeModuleDir);
        }

        try {
          return require(name);
        } catch (e) {
          // Try to guess the package name so we can print a nice
          // error message
          // fileInfo.path is a standard path, use files.pathSep
          var filePathParts = fileInfo.path.split(files.pathSep);
          var packageName = filePathParts[1].replace(/\.js$/, '');

          // XXX better message
          throw new Error(
            "Can't find npm module '" + name +
            "'. Did you forget to call 'Npm.depends' in package.js " +
            "within the '" + packageName + "' package?");
        }
      }
    };
    var getAsset = function (assetPath, encoding, callback) {
      var fut;
      if (!callback) {
        fut = new Future();
        callback = fut.resolver();
      }
      // This assumes that we've already loaded the meteor package, so meteor
      // itself can't call Assets.get*. (We could change this function so that
      // it doesn't call bindEnvironment if you don't pass a callback if we need
      // to.)
      var _callback = global.Package.meteor.Meteor.bindEnvironment(function (err, result) {
        if (result && !encoding)
        // Sadly, this copies in Node 0.10.
          result = new Uint8Array(result);
        callback(err, result);
      }, function (e) {
        console.log("Exception in callback of getAsset", e.stack);
      });

      // Convert a DOS-style path to Unix-style in case the application code was
      // written on Windows.
      assetPath = files.convertToStandardPath(assetPath);

      if (!fileInfo.assets || !_.has(fileInfo.assets, assetPath)) {
        _callback(new Error("Unknown asset: " + assetPath));
      } else {
        var filePath = path.join(serverDir, fileInfo.assets[assetPath]);
        fs.readFile(files.convertToOSPath(filePath), encoding, _callback);
      }
      if (fut)
        return fut.wait();
    };

    var Assets = {
      getText: function (assetPath, callback) {
        return getAsset(assetPath, "utf8", callback);
      },
      getBinary: function (assetPath, callback) {
        return getAsset(assetPath, undefined, callback);
      }
    };

    // \n is necessary in case final line is a //-comment
    var wrapped = "(function(Npm, Assets){" + code + "\n})";

    // It is safer to use the absolute path when source map is present as
    // different tooling, such as node-inspector, can get confused on relative
    // urls.

    // fileInfo.path is a standard path, convert it to OS path to join with
    // __dirname
    var fileInfoOSPath = files.convertToOSPath(fileInfo.path);

    // The final 'true' is an undocumented argument to runIn[Foo]Context that
    // causes it to print out a descriptive error message on parse error. It's
    // what require() uses to generate its errors.
    var func = require('vm').runInThisContext(wrapped, fileInfoOSPath, true);
    func.call(global, Npm, Assets); // Coffeescript
  });

  global.Npm = {
    /**
     * @summary Require a package that was specified using
     * `Npm.depends()`.
     * @param  {String} name The name of the package to require.
     * @locus Server
     * @memberOf Npm
     */
    require: function (name) {
      return require(name);
    }
  };

  var getAsset = function (assetPath, encoding, callback) {
    var fut;
    if (! callback) {
      fut = new Future();
      callback = fut.resolver();
    }
    // This assumes that we've already loaded the meteor package, so meteor
    // itself can't call Assets.get*. (We could change this function so that
    // it doesn't call bindEnvironment if you don't pass a callback if we need
    // to.)
    var _callback = global.Package.meteor.Meteor.bindEnvironment(function (err, result) {
      if (result && ! encoding)
      // Sadly, this copies in Node 0.10.
        result = new Uint8Array(result);
      callback(err, result);
    }, function (e) {
      console.log("Exception in callback of getAsset", e.stack);
    });

    // Convert a DOS-style path to Unix-style in case the application code was
    // written on Windows.
    assetPath = files.convertToStandardPath(assetPath);

    var filePath = path.join(serverDir, 'assets/app', assetPath);
    try {
      fs.readFile(files.convertToOSPath(filePath), encoding, _callback);
    } catch (error) {
      _callback(new Error("Unknown asset: " + assetPath));
    }
    if (fut)
      return fut.wait();
  };

  global.Assets = {
    getText: function (assetPath, callback) {
      return getAsset(assetPath, "utf8", callback);
    },
    getBinary: function (assetPath, callback) {
      return getAsset(assetPath, undefined, callback);
    }
  };

  var Jasmine = require('jasmine');
  var jasmine = new Jasmine();

  jasmine.loadConfig({
    spec_dir: '.',
    spec_files: [
      'src/modules/**/*-spec.@(js|jsx)',
      '!src/modules/*/client/**/*-spec.@(js|jsx)',
      'tests/jasmine/server/unit/**/*-spec.@(js|jsx)',
      '!tests/jasmine/server/unit/quarantine/**/*.@(js|jsx)',
    ]
  });
  jasmine.configureDefaultReporter({
    showColors: true
  });
  jasmine.execute();

}).run();

