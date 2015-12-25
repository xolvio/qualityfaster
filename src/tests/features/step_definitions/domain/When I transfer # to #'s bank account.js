module.exports = function () {
  this.When(/^I transfer \$(\d+) to "([^"]*)"'s bank account$/, function (amount, otherAccountHolderName) {
    var toAccountHolderId = this.accounts[otherAccountHolderName]._id;
    this.bankTransferResult = server.execute(function (amount, toAccountHolderId) {

      const fromAccountHolderId = Meteor.userId();
      return BankService.transfer(fromAccountHolderId, toAccountHolderId, amount);

    }, amount, toAccountHolderId);
  });
};