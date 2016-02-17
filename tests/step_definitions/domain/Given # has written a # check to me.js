module.exports = function () {
  this.Given(/^"([^"]*)" has written a \$(\d+) check to me$/, function (fromAccountHolderName, amount) {
    this.check = {
      fromAccount: this[fromAccountHolderName],
      toAccount: this.myAccount,
      branchNumber: this[fromAccountHolderName].account.branchNumber,
      amount: parseFloat(amount)
    };
  });
};
