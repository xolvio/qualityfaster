module.exports = function () {
  this.Given(/^"([^"]*)" has written a \$(\d+) check to me$/, function (accountHolderName, amount) {
    const accountHolder = fixtures.accountHolders.findById(this.accounts[accountHolderName].accountHolderId);
    this.check = {
      fromAccountNumber: this.accounts[accountHolderName].accountHolderId,
      toAccountNumber: this.accounts['My Account'].accountHolderId,
      branchNumber: accountHolder.account.branchNumber,
      amount: amount
    };
  });
};
