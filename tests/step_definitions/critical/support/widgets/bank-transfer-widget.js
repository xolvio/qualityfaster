function BankTransferWidget() {
  var selectors = {
    amount: '.bank-transfer__amount',
    accountNumber: '.bank-transfer__account-number',
    submit: '.bank-transfer__submit'
  };

  this.transferAmountToAccountNumber = function (amount, accountNumber) {
    browser.setValue(selectors.amount, amount);
    browser.setValue(selectors.accountNumber, accountNumber);
    browser.click(selectors.submit);
  }
}
widgets.bankTransfer = new BankTransferWidget();