BankService = {
  transfer(fromAccountNumber, toAccountNumber, amount) {
    const fromHolderAccount = AccountHolders.findOne(fromAccountNumber);
    const toAccountHolder = AccountHolders.findOne(toAccountNumber);
    var fromHolderAccountBalance = fromHolderAccount.get('account.balance');
    if (fromHolderAccountBalance < amount) {
      return {message: 'Insufficient Funds'};
    }
    fromHolderAccount.inc('account.balance', -amount);
    toAccountHolder.inc('account.balance', amount);
    fromHolderAccount.save();
    toAccountHolder.save();
  },
  issueChecks(accountHolderId, numberOfChecks) {
    const accountHolder = AccountHolders.findOne(accountHolderId);
    const currentNumberOfChecks = accountHolder.get('account.numberOfChecks');
    accountHolder.set('account.numberOfChecks', currentNumberOfChecks + numberOfChecks);
    accountHolder.save();
  },
  sameBankDepositCheck(fromAccountNumber, toAccountNumber, branchNumber, amount) {
    const fromHolderAccount = AccountHolders.findOne(fromAccountNumber);
    const toAccountHolder = AccountHolders.findOne(toAccountNumber);

    if (fromHolderAccount.get('account.branchNumber') !== branchNumber ||
       toAccountHolder.get('account.branchNumber') !== branchNumber) {
      return {message: 'Branch numbers do not match'};
    }
    if (fromHolderAccount.get('account.numberOfChecks') <= 0) {
      return {message: 'Account holder does not have enough checks'};
    }
    fromHolderAccount.inc({'account.numberOfChecks': -1});
    fromHolderAccount.save();
    return this.transfer(fromAccountNumber, toAccountNumber, amount);
  }
};

Meteor.methods({
  'bank/transfer' (toAccountNumber, amount) {
    if (!Meteor.userId()) {
      return {message: 'You are not logged in'};
    }
    return BankService.transfer(Meteor.userId(), toAccountNumber, amount);
  }
});