module.exports = function () {
  this.Given(/^"([^"]*)" has an account with the branch number (\d+)$/, function (accountHolderName, branchNumber) {
    this.accounts[accountHolderName] = fixtures.accountHolders.create({
      name: accountHolderName,
      username: accountHolderName.toLowerCase(),
      branchNumber: parseInt(branchNumber)
    });
  });
};