module.exports = function () {
  this.When(/^I transfer \$(\d+) to "([^"]*)"'s bank account$/, function (amount, otherAccountHolderName) {
    fixtures.accountHolders.login(this.accounts['My Account']);
    widgets.bankTransfer.transferAmountToAccountNumber(amount, this.accounts[otherAccountHolderName].accountHolderId);
    console.log("after transfer amount");
  });
};