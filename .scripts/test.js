#!/usr/bin/env node
var path = require('path'),
   extend = require('util')._extend,
   exec = require('child_process').exec;

var baseDir = path.resolve(__dirname, '..'),
   karmaBin = path.resolve(baseDir, 'node_modules/.bin/karma'),
   chimpScript = path.resolve(__dirname, 'start.js'),
    features = process.argv.slice(2);

if (features.length > 0) {
  chimpScript = chimpScript + ' ' + features.join(" ");
}

runTestsSequentially();
// TODO run tests in parallel for beefier machines

function runTestsSequentially() {
  runClientTests(function () {
    runServerTests(function () {
      runEndToEndTests(function () {
        console.log('Yay!');
      });
    });
  });
}

function runClientTests(callback) {
  if (isFirstBuildInParallelRun()) {
    startProcess({
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


function runEndToEndTests(callback) {
  startProcess({
    name: 'Chimp',
    options: {
      env: extend({CI: 1}, process.env)
    },
    command: chimpScript
  }, callback);
}

function startProcess(opts, callback) {

  var proc = exec(
     opts.command,
     opts.options
  );
  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);
  proc.on('close', function (code) {
    if (code > 0) {
      console.log(opts.name, 'exited with code ' + code);
      process.exit(code);
    } else {
      callback();
    }
  });
}
