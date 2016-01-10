module.exports = function () {
  this.Given(/^I have an account with the branch number (\d+)$/, function (branchNumber) {
    server.execute(function (branchNumber) {
      serverWorld.myAccount = new AccountHolder({
        username: 'me',
        'account.branchNumber': branchNumber
      });
    }, branchNumber);
  });
};