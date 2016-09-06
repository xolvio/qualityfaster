const DEBUG = process.env.DEBUG === 'true' || process.env.DEBUG === '1',
  CI = process.env.CI === 'true' || process.env.CI === '1';

module.exports = {
  files : ['!src/imports/{browser,ui}{,/**}', '!src/imports/**/*{browser,ui}*spec.js', 'src/imports/**/*spec.js'],
  compilers: 'babel-core/register',
  require: 'config/mocha.bootstrap.js',
  reporter: CI ? 'spec' : 'dot'
};
