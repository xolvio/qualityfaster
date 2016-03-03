module.exports = function () {
  this.Given(/^"([^"]*)"'s bank account balance is \$(\d+)$/, function (accountHolderName, balance) {
    server.execute(function (accountHolderName, balance) {
      const AccountHolderRepository = require('/imports/domain/model/account-holder/account-holder-repository').AccountHolderRepository;
      const accountHolder = AccountHolderRepository.find(serverWorld[accountHolderName].accountHolderId);
      accountHolder.account.balance = parseFloat(balance);
      AccountHolderRepository.update(accountHolder);
    }, accountHolderName, balance);
  });
};