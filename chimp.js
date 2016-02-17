var path = require('path');

module.exports = {
  watchTags: '@focus',
  path: path.resolve('tests/features'),
  domainSteps: path.resolve('tests/features/step_definitions/domain'),
  criticalSteps: path.resolve('tests/features/step_definitions/critical')
};
