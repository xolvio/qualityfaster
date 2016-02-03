module.exports = function () {
  this.Given(/^"([^"]*)" has an account with the branch number (\d+)$/, function (otherAccountHolderName, branchNumber) {
    server.execute(function (otherAccountHolderName, branchNumber) {
      var AccountHolder = require('./imports/models/account-holder').AccountHolder;
      serverWorld[otherAccountHolderName] = new AccountHolder({
        username: otherAccountHolderName,
        'account.branchNumber': branchNumber
      });
    }, otherAccountHolderName, branchNumber);
  });
};