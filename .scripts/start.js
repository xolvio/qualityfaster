#!/usr/bin/env node
var path = require('path'),
   processes = require('./processes');

var features = [];
var argv = require('minimist')(process.argv.slice(2));
argv._.forEach(function(featureFile) { features.push(path.resolve(featureFile))});

var appOptions = require('./app.config.js');
var mirrorOptions = require('./mirror.config.js');

if (argv.mocha) {
  startMocha();
} else if (argv.jasmine) {
  startJasmine();
} else {
  startCucumber();
}

function startCucumber(callback) {
  console.log('=> Running Cucumber');
  callChimp({
    path: path.resolve('tests/specifications'),
    domainSteps: path.resolve('tests/step_definitions/domain'),
    criticalSteps: path.resolve('tests/step_definitions/critical'),
    jsonOutput: process.env.CUCUMBER_JSON_OUTPUT,
  }, callback)
}

function startJasmine(callback) {
  console.log('=> Running Jasmine');
  callChimp({
    jasmine: true,
    path: path.resolve('tests/features'),
  }, callback)
}

function startMocha(callback) {
  console.log('=> Running Mocha');
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
    processes.startChimp('--ddp=' + appOptions.env.ROOT_URL + stringify(chimpSwitches), callback);
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
  processes.startApp(function () {
    processes.startMirror(function () {
      console.log('=> Test App running at:', mirrorOptions.env.ROOT_URL);
      console.log('=> Log file: tail -f', path.resolve(mirrorOptions.logFile), '\n');
      processes.startChimp('--ddp=' + mirrorOptions.env.ROOT_URL + switches);
    }, mirrorOptions);
  }, appOptions);
}

function chimpNoMirror(switches) {
  appOptions.waitForMessage = 'App running at';
  processes.startApp(function () {
    console.log("inside no mirror ", switches);
    processes.startChimp('--ddp=' + appOptions.env.ROOT_URL + switches);
  }, appOptions);
}
