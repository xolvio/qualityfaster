module.exports = function () {
  this.When(/^I deposit the check into my account$/, function () {
    fixtures.accountHolders.login(this.accounts['My Account']);
    widgets.depositWidget.depositCheckIntoMyAccount(this.check);
  });
};