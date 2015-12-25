module.exports = function () {
  this.Given(/^"([^"]*)"'s bank account balance is \$(\d+)$/, function (accountHolderName, balance) {
    server.execute(function (accountHolderName, balance) {

      var accountHolder = AccountHolders.findOne({name: accountHolderName});
      accountHolder.set('account.balance', balance);
      accountHolder.save();

    }, accountHolderName, balance);
  });
};