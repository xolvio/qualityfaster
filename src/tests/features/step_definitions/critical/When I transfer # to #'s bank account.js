module.exports = function () {
  this.When(/^I transfer \$(\d+) to "([^"]*)"'s bank account$/, function (amount, otherAccountHolderName) {
    var otherAccountHolderNumber = this.accounts[otherAccountHolderName]._id;
    widgets.bankTransfer.transferAmountToAccountNumber(amount, otherAccountHolderNumber);
  });
};