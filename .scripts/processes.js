var path = require('path')
  extend = require('util')._extend,
  exec = require('child_process').exec,
  processes = [];

var baseDir = path.resolve(__dirname, '..'),
  srcDir = path.resolve(baseDir, 'src'),
  chimpBin = path.resolve(baseDir, '.scripts/node_modules/.bin/chimp');

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
      for (var i = 0; i < processes.length; i += 1) {
        processes[i].kill();
      }
      process.exit(code);
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

module.exports = {
  startProcess: startProcess,
  startApp: startApp,
  startMirror: startMirror,
  startChimp: startChimp,
};
