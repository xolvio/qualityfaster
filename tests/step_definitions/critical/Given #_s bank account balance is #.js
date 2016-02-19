module.exports = function () {
  this.Given(/^"([^"]*)"'s bank account balance is \$(\d+)$/, function (accountHolderName, balance) {
    server.execute(function (accountHolderName, balance) {
      var accountHolder = serverWorld[accountHolderName];
      Accounts.users.update({username: accountHolder.username}, {$set: {"accountHolder.account.balance": parseFloat(balance)}});
    }, accountHolderName, balance);
  });
};