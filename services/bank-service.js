BankService = {
  transfer(fromAccountNumber, toAccountNumber, amount) {
    const fromHolderAccount = AccountHolder.findOne(fromAccountNumber);
    const toAccountHolder = AccountHolder.findOne(toAccountNumber);
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