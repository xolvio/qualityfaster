module.exports = function () {
  this.Then(/^"([^"]*)"'s account balance should be \$(\d+)$/, function (accountHolder, balance) {
    var actualBalance = server.execute(function (accountHolder) {
      return Accounts.users.findOne(accountHolder._id).accountHolder.account.balance;
    }, this.accounts[accountHolder]);
    expect(actualBalance).toEqual(parseFloat(balance));
  });
};