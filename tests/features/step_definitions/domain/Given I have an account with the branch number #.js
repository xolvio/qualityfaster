module.exports = function () {
  this.Given(/^I have an account with the branch number (\d+)$/, function (branchNumber) {
    this.accounts = this.accounts || [];
    this.accounts.mine = fixtures.accountHolders.create({
      username: 'mememe'
    }, branchNumber);
  });
};