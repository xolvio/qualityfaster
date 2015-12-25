fixtures.accountHolders = {
  DEFAULT_PASSWORD: 'l3tMe1n',
  create: function (accountHolder) {
    accountHolder.password = accountHolder.password || this.DEFAULT_PASSWORD;
    return server.execute(function (accountHolder) {
      return AccountService.create(accountHolder).raw();
    }, accountHolder);
  },
  serverLogin: function (accountHolder) {
    server.call('login', {
      user: {username: accountHolder.username},
      password: accountHolder.password
    });
  },
  clientLogin: function (accountHolder) {
    client.execute(function (accountHolder, done) {
      Meteor.loginWithPassword(accountHolder.username, accountHolder.password, done);
    }, accountHolder);
  },
  createAndLogin: function (accountHolder) {
    var newAccountHolder = this.create(accountHolder);
    this.serverLogin(accountHolder);
    if (CRITICAL) {
      this.clientLogin(accountHolder);
    }
    return newAccountHolder;
  }
};