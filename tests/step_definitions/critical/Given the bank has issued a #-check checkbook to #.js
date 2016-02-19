module.exports = function () {
  this.Given(/^the bank has issued a (\d+)\-check checkbook to "([^"]*)"$/, function (numberOfChecks, accountHolderName) {
    server.execute(function (numberOfChecks, accountHolderName) {
      var accountHolder = serverWorld[accountHolderName];
      Accounts.users.update({username: accountHolder.username}, {$set: {"accountHolder.account.numberOfChecks": numberOfChecks}});
    }, numberOfChecks, accountHolderName);
  });
};