fixtures.accountHolders = {
  DEFAULT_PASSWORD: 'l3tMe1n',
  create: function (accountHolder, branchNumber) {
    accountHolder.password = accountHolder.password || this.DEFAULT_PASSWORD;
    return server.execute(function (accountHolder, branchNumber) {
      return AccountService.create(accountHolder, branchNumber).raw();
    }, accountHolder, branchNumber);
  },
  serverLogin: function (accountHolder) {
    server.call('login', {
      user: {username: accountHolder.username},
      password: this.DEFAULT_PASSWORD
    });
  },
  clientLogin: function (accountHolder) {
    accountHolder.password = this.DEFAULT_PASSWORD;
    client.execute(function (accountHolder, done) {
      Meteor.loginWithPassword(accountHolder.username, accountHolder.password, done);
    }, accountHolder);
  },
  login: function (accountHolder) {
    this.serverLogin(accountHolder);
    if (CRITICAL) {
      this.clientLogin(accountHolder);
    }
  }
};