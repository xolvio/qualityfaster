var appOptions = require('./app.config.js');

module.exports = {
  settings: appOptions.settings,
  port: 3100,
  env: {
    IS_MIRROR: 1,
    MONGO_URL: 'mongodb://localhost:' + 3001 + '/chimp_db',
    ROOT_URL: 'http://localhost:3100'
  },
  logFile: './chimp-mirror.log'
};
