function DepositWidget() {

  var selectors = {
    fromAccountNumber: '.bank-deposit__from-account-number',
    branchNumber: '.bank-deposit__branch-number',
    amount: '.bank-deposit__amount',
    submit: '.bank-deposit__submit'
  };

  this.depositCheckIntoMyAccount = function (check) {
    browser.setValue(selectors.fromAccountNumber, check.fromAccountNumber);
    browser.setValue(selectors.branchNumber, check.branchNumber);
    browser.setValue(selectors.amount, check.amount);
    browser.click(selectors.submit);
  };
}
widgets.depositWidget = new DepositWidget();