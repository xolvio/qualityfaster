// When Meteor 1.3 --test-app mode is released, this file will only be loaded in the testing mode

// Force meteor to load modules at build time, so they can be required in Chimp's server.execute
if (false) {
  require('./imports/models/collections');
  require('./imports/models/account-holder');
  require('./imports/services/bank-service');
  require('./imports/services/account-service');
}