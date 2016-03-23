module.exports = function () {
  this.Then(/^"([^"]*)"'s account balance should be \$(\d+)$/, function (accountHolder, balance) {
    expect(this[accountHolder].account.balance).toEqual(parseFloat(balance));
  });
};