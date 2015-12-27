BankService = {
  transfer(fromAccountNumber, toAccountNumber, amount) {
    const fromHolderAccount = AccountHolders.findOne(fromAccountNumber);
    const toAccountHolder = AccountHolders.findOne(toAccountNumber);
    var fromHolderAccountBalance = fromHolderAccount.get('account.balance');
    if (fromHolderAccountBalance < amount) {
      return {message: 'Insufficient Funds'};
    }
    fromHolderAccount.set('account.balance', fromHolderAccountBalance - amount);
    toAccountHolder.set('account.balance', toAccountHolder.get('account.balance') + amount);
    fromHolderAccount.save();
    toAccountHolder.save();
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