module.exports = function () {
  this.Then(/^"([^"]*)"'s account balance should be \$(\d+)$/, function (accountHolder, balance) {
    var actualBalance = server.execute(function (accountHolder, balance) {
      return serverWorld[accountHolder].get('account.balance');
    }, accountHolder, balance);
    expect(actualBalance).toEqual(parseInt(balance));
  });
};