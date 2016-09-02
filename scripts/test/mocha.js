#!/usr/bin/env node
require('shelljs/global');
exec('mocha --opts ./config/mocha.opts.once');
