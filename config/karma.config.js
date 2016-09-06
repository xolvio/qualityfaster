// This file is only used for caching Karma dependencies on CI servers
module.exports = function (config) {
  config.set(require('./karma.options'))
};
