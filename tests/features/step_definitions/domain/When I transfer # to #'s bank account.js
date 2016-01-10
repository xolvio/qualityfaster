module.exports = function () {
  this.When(/^I transfer \$(\d+) to "([^"]*)"'s bank account$/, function (amount, otherAccountHolderName) {
    this.result = server.execute(function (amount, otherAccountHolderName) {

      var fromAccount = serverWorld.myAccount;
      var toAccount = serverWorld[otherAccountHolderName];
      return BankService.transfer(fromAccount, toAccount, amount);

    }, amount, otherAccountHolderName);
  });
};