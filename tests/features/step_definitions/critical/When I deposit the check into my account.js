module.exports = function () {
  this.When(/^I deposit the check into my account$/, function () {
    widgets.depositWidget.depositCheckIntoMyAccount(this.check);
  });
};