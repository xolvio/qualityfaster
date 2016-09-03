#!/usr/bin/env node
require('shelljs/global');
exec('chimp ' +
  '--path=tests/specifications ' +
  '--domainSteps=tests/step_definitions/domain ' +
  '--criticalSteps=tests/step_definitions/critical ' +
  '--watchSource=tests ' +
  '--no-source ');

