var testUtils = React.addons.TestUtils;

describe('Account Summary Component', function () {
  describe('getMeteorData', function () {
    it('returns the account balance for the logged in user', function () {
      spyOn(Meteor, 'userId').and.returnValue('not null');
      spyOn(AccountHolders, 'findOne').and.returnValue({account: {balance: 15}});

      var meteorData = AccountSummaryHelper.getMeteorData();

      expect(meteorData.balance).toBe(15);
    });

    it('returns balance of 0 when the user is not logged in', function () {
      spyOn(Meteor, 'userId');

      var meteorData = AccountSummaryHelper.getMeteorData();

      expect(meteorData.balance).toBe(0);
    });
  });

  describe('render', function () {
    it('shows the balance', function () {
      spyOn(ReactMeteorData, 'data').and.returnValue({balance: 10});

      var instance = testUtils.renderIntoDocument(<AccountSummary/>);

      expect(instance.getDOMNode().textContent).toBe('$ 10');
    });
  });
});