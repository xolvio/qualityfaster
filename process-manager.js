const fs = require('fs');
const exec = require('child_process').exec;

class ProcessManager {
  constructor() {
    this.processes = [];
  }
  startProcess(opts, callback) {
    const proc = exec(
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
      const logStream = fs.createWriteStream(opts.logFile, {flags: 'a'});
      proc.stdout.pipe(logStream);
      proc.stderr.pipe(logStream);
    }
    proc.on('close', function (code) {
      console.log(opts.name, 'exited with code ' + code);
      this.killAll();
      this.process.exit(code);
    });
    this.processes.push(proc);
  }
  killAll() {
    for (let i = 0; i < this.processes.length; i += 1) {
      this.processes[i].kill();
    }
  }
}

module.exports = ProcessManager;
