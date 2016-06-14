var path = require('path'),
  fs = require('fs'),
  extend = require('util')._extend,
  exec = require('child_process').exec,
  chalk = require('chalk'),
  processes = [];

var baseDir = path.resolve(__dirname, '..'),
  srcDir = path.resolve(baseDir, 'src'),
  debugBin = path.resolve(baseDir, '.scripts/node_modules/.bin/node-debug  --debug-brk=0'),
  chimpBin = path.resolve(baseDir, '.scripts/node_modules/.bin/chimp');

function stringify(switches) {
  var chimpSwitches = '';
  for (var key in switches) {
    if (!switches[key] || !switches.hasOwnProperty(key)) continue;
    chimpSwitches += ' --' + key + (switches[key] === true ? '' : '=' + switches[key]);
  }
  return chimpSwitches;
}

function killAll(code) {
  for (var i = 0; i < processes.length; i += 1) {
    processes[i].kill();
  }
  process.exit(code);
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
    if (!opts.critical || code > 0) {
      console.log(opts.name, 'exited with code ' + code);
      killAll(code);
    } else {
      callback();
    }
  });
  processes.push(proc);
}

function startApp(callback, options) {
  startProcess({
    name: 'Meteor App',
    command: 'meteor --settings ' + options.settings + ' --port ' + options.port,
    waitForMessage: options.waitForMessage,
    options: {
      cwd: srcDir,
      env: extend(options.env, process.env)
    }
  }, callback);
}

function startMirror(callback, options) {
  startProcess({
    // TODO check if settings file exists first
    name: 'Meteor Mirror',
    command: 'meteor --settings ' + options.settings + ' --port ' + options.port,
    silent: true,
    logFile: options.logFile,
    waitForMessage: 'App running at',
    options: {
      cwd: srcDir,
      env: extend(options.env, process.env)
    }
  }, callback);
}

function startChimp(switches, callback) {
  var command = `${switches.debug ? debugBin : 'node'} ${chimpBin} ${stringify(switches)}`;
  console.log("chimpBin ", chimpBin);
  console.log("switches ", switches);
  console.log("command ", command);

  startProcess({
    name: 'Chimp',
    command: command,
    options: {
      env: Object.assign({}, process.env, {
        NODE_PATH: process.env.NODE_PATH +
          path.delimiter + srcDir +
          path.delimiter + srcDir + '/node_modules',
      }),
    },
  }, callback);

  console.log(chalk.white.bgRed.bold('\n >> Debug mode is ON! \n'));
  console.log(chalk.green(' >> start debugging your tests at:'));
  console.log(chalk.green(' >>', chalk.underline('http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5859'), '\n'));
  console.log(chalk.yellow(' Remember to add `debugger;` statements in your tests!', '\n\n'));
}

module.exports = {
  startProcess: startProcess,
  startApp: startApp,
  startMirror: startMirror,
  startChimp: startChimp,
  killAll: killAll,
};
