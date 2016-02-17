import AccountSummary from '/imports/ui/components/account-summary';
import {AccountHolders} from 'models/collections';
const {renderIntoDocument} = React.addons.TestUtils;

describe('Account Summary Component', function () {
  describe('render', function () {
    it('shows the balance', function () {
      const instance = renderIntoDocument(
        <AccountSummary account={{balance: 10}}/>
      );
      const element = ReactDOM.findDOMNode(instance);

      expect(element.innerText).toBe('$ 10');
    });
  });
});
