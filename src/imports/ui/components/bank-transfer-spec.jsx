var testUtils = React.addons.TestUtils;

describe('Bank Transfer Component', function () {
  var BankTransfer;
  beforeEach(function () {
    BankTransfer = require('./bank-transfer').default;
  });
  describe('doTransfer', function () {
    it('should call the bank transfer service using the values from the form when submit is clicked', function () {
      const instance = testUtils.renderIntoDocument(<BankTransfer/>);
      instance.refs.amount.value = 10;
      instance.refs.accountNumber.value = 1234567890;
      spyOn(Meteor, 'call');

      const form = testUtils.findRenderedDOMComponentWithTag(instance, 'form');
      testUtils.Simulate.submit(form);

      expect(Meteor.call).toHaveBeenCalledWith('bank/transfer', '1234567890', '10');
    });
  });
});
