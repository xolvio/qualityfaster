module.exports = function () {
  this.Given(/^"([^"]*)"'s bank account balance is \$(\d+)$/, function (accountHolderName, balance) {
    this[accountHolderName].account.balance = parseFloat(balance);
  });
};