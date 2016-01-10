module.exports = function () {
  this.Given(/^my bank account balance is \$(\d+)$/, function (balance) {
    server.execute(function (balance) {

      serverWorld.myAccount.set('account.balance', balance);

    }, balance);
  });
};
