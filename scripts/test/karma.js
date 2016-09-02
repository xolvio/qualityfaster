#!/usr/bin/env node
require('shelljs/global');
exec('karma start --singleRun --reporters=mocha ./config/karma.conf.js');
