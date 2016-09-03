#!/usr/bin/env node
require('shelljs/global');
exec('karma start --reporters=dots ./config/karma.conf.js');
