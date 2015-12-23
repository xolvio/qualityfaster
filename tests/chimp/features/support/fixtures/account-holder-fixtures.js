fixtures.accountHolders = {
  DEFAULT_PASSWORD: 'l3tMe1n',
  create: function (accountHolder) {
    accountHolder.password = accountHolder.password || this.DEFAULT_PASSWORD;
    server.execute(function (accountHolder) {
      var accountHolderId = Accounts.createUser({
        username: accountHolder.username,
        password: accountHolder.password
      });
      var newAccountHolder = Meteor.users.findOne(accountHolderId);
      newAccountHolder.set(accountHolder);
      newAccountHolder.save();
    }, accountHolder);
  },
  serverLogin: function (accountHolder) {
    server.call('login', {
      user: {username: accountHolder.username},
      password: accountHolder.password
    });
  },
  createAndLogin: function (accountHolder) {
    this.create(accountHolder);
    this.serverLogin(accountHolder);
  }
};