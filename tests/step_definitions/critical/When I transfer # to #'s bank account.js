module.exports = function () {
  this.When(/^I transfer \$(\d+) to "([^"]*)"'s bank account$/, function (amount, otherAccountHolderName) {
    fixtures.accountHolders.login(this.accounts.myAccount);
    widgets.bankTransfer.transferAmountToAccountNumber(amount, this.accounts[otherAccountHolderName]._id);
  });
};