module.exports = function () {
  this.When(/^I transfer \$(\d+) to "([^"]*)"'s bank account$/, function (amount, toAccountHolderName) {
    this.bankTransferResult = server.execute(function (amount, toAccountHolderName) {
      const fromAccountHolderId = Meteor.userId();
      const toAccountHolderId = AccountHolders.findOne({name: toAccountHolderName})._id;
      return BankService.transfer(fromAccountHolderId, toAccountHolderId, amount);
    }, amount, toAccountHolderName);
  });
};