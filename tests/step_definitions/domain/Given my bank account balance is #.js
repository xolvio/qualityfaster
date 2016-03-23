module.exports = function () {
  this.Given(/^my bank account balance is \$(\d+)$/, function (balance) {
    this.myAccount.account.balance = parseFloat(balance);
  });
};
