import AccountSummary from './account-summary.jsx'
import BankTransfer from './bank-transfer.jsx'
import BankDeposit from './bank-deposit.jsx'
import AccountService from '/imports/application/services/account-service'

export const App = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    const accountService = AccountService.getInstance();
    const accountHolder = accountService.getCurrentAccountHolder();
    return {
      account: accountHolder.account
    }
  },
  render() {
    return (
       <div className="container">
         <header>
           <h1>Bank.io</h1>
         </header>
         <AccountSummary account={this.data.account}/>
         <BankTransfer />
         <BankDeposit />
       </div>
    );
  }
});