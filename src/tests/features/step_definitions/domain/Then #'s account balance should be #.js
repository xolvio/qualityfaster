module.exports = function () {
  this.Then(/^"([^"]*)"'s account balance should be \$(\d+)$/, function (accountHolder, balance) {
    var actualBalance = server.execute(function (accountHolder) {
      return AccountHolders.findOne({name: accountHolder}).account.balance;
    }, accountHolder);
    expect(actualBalance).toEqual(parseFloat(balance));
  });
};