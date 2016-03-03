module.exports = function () {
  this.Given(/^my bank account balance is \$(\d+)$/, function (balance) {
    server.execute(function (balance) {
      const AccountHolderRepository = require('/imports/domain/model/account-holder/account-holder-repository').AccountHolderRepository;
      const accountHolder = AccountHolderRepository.find(serverWorld['My Account'].accountHolderId);
      accountHolder.account.balance = parseFloat(balance);
      AccountHolderRepository.update(accountHolder);
    }, balance);
  });
};