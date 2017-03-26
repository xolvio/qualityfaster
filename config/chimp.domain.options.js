module.exports = {
  path: 'tests/specifications',
  browser: process.env.BROWSER ? process.env.BROWSER : 'chrome',
  chai: true,
  timeout: 5000,
  port: 4455,
  domainSteps: 'tests/step_definitions/domain',
  fullDomain: true,
  domainOnly: true,
  watchSource: 'src/imports',
  // format: 'progress'
};
