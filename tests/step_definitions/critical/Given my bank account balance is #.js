module.exports = function () {
  this.Given(/^my bank account balance is \$(\d+)$/, function (balance) {
    server.execute(function (balance) {
      var myAccount = serverWorld['My Account'];
      Accounts.users.update({username: myAccount.username}, {$set: {"accountHolder.account.balance": parseFloat(balance)}});
    }, balance);
  });
};