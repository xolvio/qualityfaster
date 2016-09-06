module.exports = {
  path: 'tests',
  browser: 'chrome',
  chai: true,
  timeout: 60000,
  port: 4444,
  domainSteps: 'tests/step_definitions/domain',
  criticalSteps: 'tests/step_definitions/critical',
  watchSource: 'src/imports',
};
