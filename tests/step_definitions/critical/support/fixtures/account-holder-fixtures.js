fixtures.accountHolders = {
  DEFAULT_PASSWORD: 'l3tMe1n',
  create: function (accountHolder, branchNumber) {
    accountHolder.password = accountHolder.password || this.DEFAULT_PASSWORD;
    return server.execute(function (accountHolder) {
      var AccountService = require('/imports/application/services/account-service').default.getInstance();
      serverWorld[accountHolder.name] = accountHolder;
      var userId = AccountService.create(accountHolder);
      return Accounts.users.findOne(userId);
    }, accountHolder);
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
    accountHolder.password = accountHolder.password || this.DEFAULT_PASSWORD;
    this.serverLogin(accountHolder);
    this.clientLogin(accountHolder);
  }
};