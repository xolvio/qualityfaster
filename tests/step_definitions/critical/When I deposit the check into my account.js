module.exports = function () {
  this.When(/^I deposit the check into my account$/, function () {
    fixtures.accountHolders.login(this.accounts.myAccount);
    widgets.depositWidget.depositCheckIntoMyAccount(this.check);
  });
};