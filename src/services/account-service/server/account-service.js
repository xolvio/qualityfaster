AccountService = {
  create: function(accountHolder, branchNumber) {
    var accountHolderId = Accounts.createUser({
      username: accountHolder.username,
      password: accountHolder.password
    });
    delete accountHolder.password;
    var newAccountHolder = Meteor.users.findOne(accountHolderId);
    newAccountHolder.set(accountHolder);
    newAccountHolder.set('account.branchNumber', branchNumber);
    newAccountHolder.save();
    return newAccountHolder;
  }
};