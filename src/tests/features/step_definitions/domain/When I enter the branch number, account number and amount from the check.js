module.exports = function () {
  this.When(/^I enter the branch number, account number and amount from the check$/, function () {
    server.execute(function (fromAccountNumber, toAccountNumber, branchNumber, amount) {
      return BankService.sameBankDepositCheck(fromAccountNumber, toAccountNumber, branchNumber, amount);
    }, this.check.fromAccountNumber, this.check.toAccountNumber, this.check.branchNumber, this.check.amount);
  });
};