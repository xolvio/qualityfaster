// Force meteor to load modules at build time, so they can be required in Chimp's server.execute
if (false) {
  require('./imports/domain/services/bank-service/client');
  require('./imports/application/services/account-service/client');
}