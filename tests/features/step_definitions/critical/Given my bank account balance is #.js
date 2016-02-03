module.exports = function () {
  this.Given(/^my bank account balance is \$(\d+)$/, function (balance) {
    server.execute(function (balance) {
      var AccountHolders = require('./imports/models/collections').AccountHolders;
      var accountHolder = AccountHolders.findOne(Meteor.userId());
      accountHolder.set('account.balance', balance);
      accountHolder.save();
    }, balance);
  });
};