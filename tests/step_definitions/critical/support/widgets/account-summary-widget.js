function AccountSummaryWidget() {
  var selectors = {
    balance: '.account-summary__balance'
  };

  this.getBalance = function () {
    // FIXME need a better way to wait for the value to update on the client
    browser.pause(300);
    return browser.getText(selectors.balance);
  }
}
widgets.accountSummary = new AccountSummaryWidget();