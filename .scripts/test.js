#!/usr/bin/env node
var path = require('path'),
   extend = require('util')._extend,
   processes = require('./processes');

var baseDir = path.resolve(__dirname, '..'),
   karmaBin = path.resolve(baseDir, 'node_modules/.bin/karma'),
   chimpScript = path.resolve(__dirname, 'start.js'),
    features = process.argv.slice(2);

var appOptions = require('./app.config.js');

if (features.length > 0) {
  chimpScript = chimpScript + ' ' + features.join(" ");
}

runTestsSequentially();
// TODO run tests in parallel for beefier machines

function runTestsSequentially() {
  runClientTests(function () {
    runMeteor(function() {
      runServerTests(function () {
        runEndToEndTests(function () {
          console.log('Yay!');
        });
      });
    });
  });
}

function runClientTests(callback) {
  if (isFirstBuildInParallelRun()) {
    processes.startProcess({
      name: 'Karma',
      options: {},
      command: karmaBin + ' start karma.conf.js --single-run'
    }, callback);
  } else {
    callback();
  }
}

function isFirstBuildInParallelRun() {
  const _nodeIndex = process.env.NODE_INDEX;
  return typeof _nodeIndex !== 'undefined' && parseInt(_nodeIndex) === 0
}

function runServerTests(callback) {
  // TODO add Meteor 1.3 server testing mode
  callback();
}

function runMeteor(callback) {
  appOptions.waitForMessage = 'App running at';
  processes.startApp(callback, appOptions);
}

function runEndToEndTests(callback) {
  processes.startProcess({
    name: 'Chimp - Mocha',
    options: {
      env: extend({CI: 1}, process.env)
    },
    critical: true,
    command: 'NO_METEOR=1 ' + chimpScript + ' --mocha'
  }, function() {
    processes.startProcess({
      name: 'Chimp - Jasmine',
      options: {
        env: extend({CI: 1}, process.env)
      },
      critical: true,
      command: 'NO_METEOR=1 ' + chimpScript + ' --jasmine'
    }, function() {
      processes.startProcess({
        name: 'Chimp - Cucumber',
        options: {
          env: extend({CI: 1}, process.env)
        },
        critical: true,
        command: 'NO_METEOR=1 ' + chimpScript
      }, callback);
    });
  });
}
