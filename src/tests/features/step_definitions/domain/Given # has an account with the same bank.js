module.exports = function () {
  this.Given(/^"([^"]*)" has an account with the same bank$/, function (otherAccountHolderName) {
    this.accounts = this.accounts || [];
    this.accounts[otherAccountHolderName] = fixtures.accountHolders.create({
      name: otherAccountHolderName,
      username: otherAccountHolderName.toLowerCase()
    });
  });
};