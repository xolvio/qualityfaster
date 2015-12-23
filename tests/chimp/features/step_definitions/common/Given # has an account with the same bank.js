module.exports = function () {
  this.Given(/^"([^"]*)" has an account with the same bank$/, function (accountHolderName) {
    fixtures.accountHolders.create({
      name: accountHolderName,
      username: 'james'
    });
  });
};