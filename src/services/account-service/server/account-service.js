AccountService = {
  create: function(accountHolder) {
    var accountHolderId = Accounts.createUser({
      username: accountHolder.username,
      password: accountHolder.password
    });
    delete accountHolder.password;
    var newAccountHolder = Meteor.users.findOne(accountHolderId);
    newAccountHolder.set(accountHolder);
    newAccountHolder.save();
    return newAccountHolder;
  }
};