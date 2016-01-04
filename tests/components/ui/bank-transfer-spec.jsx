var testUtils = React.addons.TestUtils;

describe('Bank Transfer Component', function () {
  describe('doTransfer', function () {
    it('submitting the form calls the bank transfer service using the values from the form', function () {
      const instance = testUtils.renderIntoDocument(<BankTransfer/>);
      const form = testUtils.findRenderedDOMComponentWithTag(instance, 'form');
      instance.refs.amount.getDOMNode().value = 10;
      instance.refs.accountNumber.getDOMNode().value = 1234567890;
      spyOn(Meteor, 'call');

      testUtils.Simulate.submit(form);

      expect(Meteor.call).toHaveBeenCalledWith('bank/transfer', '1234567890', '10');
    });
  });
});