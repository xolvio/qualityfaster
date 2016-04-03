var path = require('path');

module.exports = {
  watchTags: '@focus',
  path: path.resolve('tests'),
  domainSteps: path.resolve('tests/step_definitions/domain'),
  criticalSteps: path.resolve('tests/step_definitions/critical')
};
