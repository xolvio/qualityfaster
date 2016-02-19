var BankTransfer = require('./bank-transfer').default;

var testUtils = React.addons.TestUtils;

describe('Bank Transfer Component', function () {
  describe('doTransfer', function () {
    it('should call the bank transfer service using the values from the form when submit is clicked', function () {
      const instance = testUtils.renderIntoDocument(<BankTransfer/>);
      instance.refs.amount.getDOMNode().value = 10;
      instance.refs.accountNumber.getDOMNode().value = 1234567890;
      spyOn(Meteor, 'call');

      const form = testUtils.findRenderedDOMComponentWithTag(instance, 'form');
      testUtils.Simulate.submit(form);

      expect(Meteor.call).toHaveBeenCalledWith('bank/transfer', '1234567890', '10');
    });
  });
});
