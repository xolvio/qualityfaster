#!/usr/bin/env node
require('shelljs/global');
const files = find('src/imports').filter(function(file) { return file.match(/^(?!.*(browser|ui)).*$/); }).join(' ');
exec('mocha --opts ./config/mocha.opts ' + files);
