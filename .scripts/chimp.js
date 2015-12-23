#!/usr/bin/env node
var path = require('path'),
   fs = require('fs'),
   extend = require('util')._extend,
   exec = require('child_process').exec;

var appOptions = {
  settings: 'settings.json',
  port: 3000,
  env: {
    ROOT_URL: 'http://localhost:3000/',
    VELOCITY: 0,
    JASMINE_CLIENT_UNIT: 0,
    JASMINE_CLIENT_INTEGRATION: 0
  }
};

var mirrorOptions = {
  settings: appOptions.settings,
  port: 3100,
  env: {
    MONGO_URL: 'mongodb://localhost:27017/chimp_db',
    ROOT_URL: 'http://localhost:3100/'
  },
  logFile: './chimp-mirror.log'
};

var chimpSwitches = ' --path=tests/chimp/features' +
   ' -r=tests/chimp/features/support' +
   ' -r=tests/chimp/features/step_definitions/common';

// Switch between UI and Domain testing
if (process.env.UI) {
  // UI Testing
  chimpSwitches  += ' -r=tests/chimp/features/step_definitions/ui';
} else {
  // DOMAIN Testing
  chimpSwitches  += ' --browser=phantomjs'; // no need for the browser when in domain discovery mode
  chimpSwitches  += ' -r=tests/chimp/features/step_definitions/domain';
}

if (!process.env.CI) {
  chimpSwitches  += ' --watch'; // when not in Watch mode, Chimp existing will exit Meteor too
}

if (process.env.WITH_MIRROR) { // set this flat to start with a mirror.
  chimpWithMirror();
} else {
  chimpNoMirror();
}

// *************************************************

function chimpWithMirror() {
  appOptions.waitForMessage = 'Started MongoDB';
  startApp(function () {
    startMirror(function () {
      console.log('=> Test App running at:', mirrorOptions.env.ROOT_URL);
      console.log('=> Log file: tail -f', path.resolve(mirrorOptions.logFile), '\n');
      startChimp('--ddp=' + mirrorOptions.env.ROOT_URL + chimpSwitches
      )
    });
  });
}

function chimpNoMirror() {
  appOptions.waitForMessage = 'App running at';
  startApp(function () {
    startChimp('--ddp=' + appOptions.env.ROOT_URL + chimpSwitches
    );
  });
}

function startApp(callback) {
  startProcess({
    name: 'Meteor App',
    command: 'meteor --settings ' + appOptions.settings + ' --port ' + appOptions.port,
    waitForMessage: appOptions.waitForMessage,
    options: {
      env: extend(appOptions.env, process.env)
    }
  }, callback);
}

function startMirror(callback) {
  startProcess({
    name: 'Meteor Mirror',
    command: 'meteor --settings ' + mirrorOptions.settings + ' --port ' + mirrorOptions.port,
    silent: true,
    logFile: mirrorOptions.logFile,
    waitForMessage: 'App running at',
    options: {
      env: extend(mirrorOptions.env, process.env)
    }
  }, callback);
}

function startChimp(command) {
  startProcess({
    name: 'Chimp',
    command: path.resolve(__dirname, '../node_modules/.bin/chimp') + ' ' + command
  });
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
    process.exit(code);
  });
}
