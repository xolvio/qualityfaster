const DEBUG = process.env.DEBUG === 'true' || process.env.DEBUG === '1',
  CI = process.env.CI === 'true' || process.env.CI === '1';

module.exports = {
  files : ['config/mocha.bootstrap.js', '!src/imports/{browser,ui}{,/**}', '!src/imports/**/*{browser,ui}*spec.js', 'src/imports/**/*spec.js'],
  compilers: 'babel-core/register',
  reporter: CI ? 'spec' : 'dot',
  ui: 'bdd',
  watchDir: 'src/imports/**/*.js'
};
