import './account-summary.jsx'
import './bank-transfer.jsx'
import './bank-deposit.jsx'
import AccountService from '../../services/account-service'

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