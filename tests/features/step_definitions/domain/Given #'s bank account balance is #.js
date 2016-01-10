module.exports = function () {
  this.Given(/^"([^"]*)"'s bank account balance is \$(\d+)$/, function (accountHolderName, balance) {
    server.execute(function (accountHolderName, balance) {
      serverWorld[accountHolderName].set('account.balance', balance);
    }, accountHolderName, balance);
  });
};