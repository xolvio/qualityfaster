const BankDeposit = React.createClass({
  doDeposit(event) {
    event.preventDefault();
    const fromAccountNumber = this.refs.fromAccountNumber.value.trim();
    const branchNumber = parseInt(this.refs.branchNumber.value.trim());
    const amount = parseFloat(this.refs.amount.value.trim());
    Meteor.call('bank/depositCheck', fromAccountNumber, branchNumber, amount);
  },
  render() {
    return (
       <div className="bank-deposit">
         <form className="bank-deposit__form" onSubmit={this.doDeposit}>
           <fieldset className="bank-deposit__fieldset">
             <legend>Deposit</legend>
             <input className="bank-deposit__from-account-number"
                    type="text"
                    ref="fromAccountNumber"
                    placeholder="From Account Number"/>
             <input className="bank-deposit__branch-number"
                    type="text"
                    ref="branchNumber"
                    placeholder="Branch Number"/>
             <input className="bank-deposit__amount"
                    type="text"
                    ref="amount"
                    placeholder="Amount on Check"/>
             <input className="bank-deposit__submit"
                    type="submit"
                    value="Make Deposit"/>
           </fieldset>
         </form>
       </div>
    );
  }
});
export default BankDeposit;