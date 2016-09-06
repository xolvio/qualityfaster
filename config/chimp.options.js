module.exports = {
  path: 'tests',
    browser: 'phantomjs',
  timeout: 60000,
  port: 2345,
  domainSteps: 'tests/step_definitions/domain',
  criticalSteps: 'tests/step_definitions/critical',
  watchSource: 'src/imports',
};
