module.exports = function () {
  this.Then(/^"([^"]*)"'s account balance should be \$(\d+)$/, function (accountHolder, balance) {
    var actualBalance = server.execute(function (accountHolder) {
      var AccountHolders = require('./imports/models/collections').AccountHolders;
      return AccountHolders.findOne({name: accountHolder}).account.balance;
    }, accountHolder);
    expect(actualBalance).toEqual(parseFloat(balance));
  });
};