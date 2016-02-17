module.exports = function () {
  this.Given(/^my bank account balance is \$(\d+)$/, function (balance) {
    server.execute(function (balance) {
      var myAccount = serverWorld['myAccount'];
      console.log('***', serverWorld)
      Accounts.users.update({username: myAccount.username}, {$set: {"account.balance": parseFloat(balance)}});
    }, balance);
  });
};