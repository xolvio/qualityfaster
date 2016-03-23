Package.describe({
  name: 'xolvio:backdoor',
  summary: 'Runs arbitrary code on server',
  version: '0.2.0',
  debugOnly: true
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.2.1');
  api.use('ecmascript');
  api.use('check');
  api.use('modules');
  api.addFiles('server.js', 'server');
});

Package.onTest(function(api) {
  api.versionsFrom('METEOR@1.2.1');
  api.use('xolvio:backdoor');
  api.use('ecmascript');
  api.use('sanjo:jasmine@0.20.3');

  api.addFiles('tests/xolvio_backdoor.js', 'client');
});
