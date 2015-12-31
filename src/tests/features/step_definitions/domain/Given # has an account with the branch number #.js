module.exports = function () {
  this.Given(/^"([^"]*)" has an account with the branch number (\d+)$/, function (otherAccountHolderName, branchNumber) {
    this.accounts = this.accounts || [];
    this.accounts[otherAccountHolderName] = fixtures.accountHolders.create({
      name: otherAccountHolderName,
      username: otherAccountHolderName.toLowerCase()
    }, branchNumber);
  });
};