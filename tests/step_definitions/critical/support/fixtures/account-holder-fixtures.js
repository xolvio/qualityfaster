fixtures.accountHolders = {
  DEFAULT_PASSWORD: 'l3tMe1n',
  create: function (accountHolderData) {
    accountHolderData.password = accountHolderData.password || this.DEFAULT_PASSWORD;
    return server.execute(function (accountHolder) {
      var AccountService = require('/imports/application/services/account-service').default.getInstance();
      var userId = AccountService.create(accountHolder);
      serverWorld[accountHolder.name] = Accounts.users.findOne(userId);
      return serverWorld[accountHolder.name];
    }, accountHolderData);
  },
  findById: function (accountHolderId) {
    return server.execute(function (accountHolderId) {
      const AccountHolderRepository = require('/imports/domain/model/account-holder/account-holder-repository').AccountHolderRepository;
      return AccountHolderRepository.find(accountHolderId);
    }, accountHolderId);
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
