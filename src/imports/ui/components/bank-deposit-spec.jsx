var testUtils = React.addons.TestUtils;

describe('<BankDeposit>', function () {
  var BankDeposit;
  beforeEach(function () {
    BankDeposit = require('./bank-deposit').default;
  });

  describe('depositCheckIntoMyAccount', function () {
    it('submitting the form calls the bank deposit check service using the values from the form', function () {
      const instance = testUtils.renderIntoDocument(<BankDeposit/>);
      const form = testUtils.findRenderedDOMComponentWithTag(instance, 'form');
      instance.refs.fromAccountNumber.value = 'ABCD12345';
      instance.refs.branchNumber.value = 123;
      instance.refs.amount.value = 10.23;
      spyOn(Meteor, 'call');

      testUtils.Simulate.submit(form);

      expect(Meteor.call).toHaveBeenCalledWith('bank/depositCheck', 'ABCD12345', 123, 10.23);
    });
  });
});
