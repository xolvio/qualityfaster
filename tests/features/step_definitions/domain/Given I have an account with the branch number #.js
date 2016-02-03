module.exports = function () {
  this.Given(/^I have an account with the branch number (\d+)$/, function (branchNumber) {
    server.execute(function (branchNumber) {
      var AccountHolder = require('./imports/models/account-holder').AccountHolder;
      serverWorld.myAccount = new AccountHolder({
        username: 'me',
        'account.branchNumber': branchNumber
      });
    }, branchNumber);
  });
};