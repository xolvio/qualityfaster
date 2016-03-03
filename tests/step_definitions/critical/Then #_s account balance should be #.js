module.exports = function () {
  this.Then(/^"([^"]*)"'s account balance should be \$(\d+)$/, function (accountHolderName, balance) {
    const accountHolder = fixtures.accountHolders.findById(this.accounts[accountHolderName].accountHolderId);
    expect(accountHolder.account.balance).toEqual(parseFloat(balance));
  });
};
