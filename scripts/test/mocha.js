#!/usr/bin/env node
require('shelljs/global');
// FIXME this is suboptimal. If a user creates a new directory after running the watcher, it would not be excluded
// maybe use gulp and this // maybe use this instead https://github.com/knpwrs/gulp-spawn-mocha
const files = find('src/imports').filter(function(file) { return file.match(/^(?!.*(browser|ui)).*$/); }).join(' ');
exec('mocha --opts ./config/mocha.opts.once ' + files);
