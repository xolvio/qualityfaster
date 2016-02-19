module.exports = function () {
  this.Given(/^"([^"]*)" has written a \$(\d+) check to me$/, function (fromAccountHolder, amount) {
    this.check = {
      fromAccountNumber: this.accounts[fromAccountHolder]._id,
      toAccountNumber: this.accounts['My Account']._id,
      branchNumber: this.accounts[fromAccountHolder].accountHolder.account.branchNumber,
      amount: amount
    };
  });
};

