module.exports = function () {
  this.Given(/^"([^"]*)" has an account with the branch number (\d+)$/, function (otherAccountHolderName, branchNumber) {
    server.execute(function (otherAccountHolderName, branchNumber) {
      serverWorld[otherAccountHolderName] = new AccountHolder({
        username: otherAccountHolderName,
        'account.branchNumber': branchNumber
      });
    }, otherAccountHolderName, branchNumber);
  });
};