// Force meteor to load modules at build time, so they can be required in Chimp's server.execute
if (false) {
  require('./imports/validation');
  require('./imports/models/account-holder');
  require('./imports/domain/services/bank-service');
  require('./imports/domain/services/bank-service/server');
  require('./imports/application/services/account-service');
  require('./imports/application/services/account-service/server');
  require('./imports/application/services/bank-service/server');
}
