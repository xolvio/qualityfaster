#!/usr/bin/env node
var path = require('path'),
   fs = require('fs'),
   extend = require('util')._extend,
   exec = require('child_process').exec,
   processes = [];

var baseDir = path.resolve(__dirname, '..'),
   srcDir = path.resolve(baseDir, 'src'),
   chimpBin = path.resolve(baseDir, '.scripts/node_modules/.bin/chimp'),
   features = [];

var argv = require('minimist')(process.argv.slice(2));
argv._.forEach(function(featureFile) { features.push(path.resolve(featureFile))});

var appOptions = {
  settings: 'settings.json',
  port: 3000,
  env: {
    ROOT_URL: 'http://localhost:3000'
  }
};

var mirrorOptions = {
  settings: appOptions.settings,
  port: 3100,
  env: {
    IS_MIRROR: 1,
    MONGO_URL: 'mongodb://localhost:' + 3001 + '/chimp_db',
    ROOT_URL: 'http://localhost:3100'
  },
  logFile: './chimp-mirror.log'
};

if (argv.mocha) {
  startMocha();
} else if (argv.jasmine) {
  startJasmine();
} else {
  startCucumber();
}

function startCucumber(callback) {
  console.log('Running Cucumber');
  callChimp({
    path: path.resolve('tests/specifications'),
    domainSteps: path.resolve('tests/step_definitions/domain'),
    criticalSteps: path.resolve('tests/step_definitions/critical'),
    jsonOutput: process.env.CUCUMBER_JSON_OUTPUT,
  }, callback)
}

function startJasmine(callback) {
  console.log('Running Jasmine');
  callChimp({
    jasmine: true,
    path: path.resolve('tests/features'),
  }, callback)
}

function startMocha(callback) {
  console.log('Running Mocha');
  callChimp({
    mocha: true,
    path: path.resolve('tests/features'),
  }, callback)
}

function callChimp(chimpSwitches, callback) {
  chimpSwitches = chimpSwitches || {};

  if (features.length > 0) {
    chimpSwitches.path = path.resolve('tests') + ' ' + features.join(" ");
  }

  chimpSwitches.watchSource = path.resolve('tests');
  chimpSwitches.singleSnippetPerFile = 1;
  chimpSwitches['no-source'] = true;

  if (!process.env.CI && !process.env.TRAVIS && !process.env.CIRCLECI) {
    // when not in Watch mode, Chimp existing will exit Meteor too
    chimpSwitches.watch = true;
  }

  if (process.env.CIRCLECI) {
    chimpSwitches.screenshotsPath= process.env.CIRCLE_ARTIFACTS;
  }

  if (process.env.SIMIAN_API && process.env.SIMIAN_REPOSITORY) {
    chimpSwitches.simianRepositoryId = process.env.SIMIAN_REPOSITORY;
    chimpSwitches.simianAccessToken = process.env.SIMIAN_API;
  }

  // set this flag to start with a mirror locally (ala Velocity xolvio:cucumber style)
  if (process.env.WITH_MIRROR) {
    chimpWithMirror(stringify(chimpSwitches));
  } else if (process.env.NO_METEOR) {
    startChimp('--ddp=' + appOptions.env.ROOT_URL + stringify(chimpSwitches), callback);
  } else {
    // *************************************************
    // THIS IS THE DEFAULT
    // *************************************************
    chimpNoMirror(stringify(chimpSwitches));
  }
}

// *************************************************

function stringify(switches) {
  var chimpSwitches = '';
  for (var key in switches) {
    if (!switches[key] || !switches.hasOwnProperty(key)) continue;
    chimpSwitches += ' --' + key + (switches[key] === true ? '' : '=' + switches[key]);
  }
  return chimpSwitches;
}

function chimpWithMirror(switches) {
  appOptions.waitForMessage = 'Started MongoDB';
  startApp(function () {
    startMirror(function () {
      console.log('=> Test App running at:', mirrorOptions.env.ROOT_URL);
      console.log('=> Log file: tail -f', path.resolve(mirrorOptions.logFile), '\n');
      startChimp('--ddp=' + mirrorOptions.env.ROOT_URL + switches);
    });
  });
}

function chimpNoMirror(switches) {
  appOptions.waitForMessage = 'App running at';
  startApp(function () {
    console.log("inside no mirror ", switches);
    startChimp('--ddp=' + appOptions.env.ROOT_URL + switches);
  });
}

function startApp(callback) {
  startProcess({
    name: 'Meteor App',
    command: 'meteor --settings ' + appOptions.settings + ' --port ' + appOptions.port,
    waitForMessage: appOptions.waitForMessage,
    options: {
      cwd: srcDir,
      env: extend(appOptions.env, process.env)
    }
  }, callback);
}

function startMirror(callback) {
  startProcess({
    // TODO check if settings file exists first
    name: 'Meteor Mirror',
    command: 'meteor --settings ' + mirrorOptions.settings + ' --port ' + mirrorOptions.port,
    silent: true,
    logFile: mirrorOptions.logFile,
    waitForMessage: 'App running at',
    options: {
      cwd: srcDir,
      env: extend(mirrorOptions.env, process.env)
    }
  }, callback);
}

function startChimp(command, callback) {
  console.log("chimpBin ", chimpBin);
  console.log("command ", command);
  startProcess({
    name: 'Chimp',
    command: chimpBin + ' ' + command,
    options: {
      env: Object.assign({}, process.env, {
        NODE_PATH: process.env.NODE_PATH +
          path.delimiter + srcDir +
          path.delimiter + srcDir + '/node_modules',
      }),
    },
  }, callback);
}

function startProcess(opts, callback) {
  var proc = exec(
     opts.command,
     opts.options
  );
  if (opts.waitForMessage) {
    proc.stdout.on('data', function waitForMessage(data) {
      if (data.toString().match(opts.waitForMessage)) {
        if (callback) {
          callback();
        }
      }
    });
  }
  if (!opts.silent) {
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
  }
  if (opts.logFile) {
    var logStream = fs.createWriteStream(opts.logFile, {flags: 'a'});
    proc.stdout.pipe(logStream);
    proc.stderr.pipe(logStream);
  }
  proc.on('close', function (code) {
    console.log(opts.name, 'exited with code ' + code);
    for (var i = 0; i < processes.length; i += 1) {
      processes[i].kill();
    }
    process.exit(code);
  });
  processes.push(proc);
}
