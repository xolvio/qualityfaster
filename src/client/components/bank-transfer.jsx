BankTransfer = React.createClass({
  doTransfer(event) {
    event.preventDefault();
    const amount = React.findDOMNode(this.refs.amount).value.trim();
    const accountNumber = React.findDOMNode(this.refs.accountNumber).value.trim();
    Meteor.call('bank/transfer', accountNumber, amount);
  },
  render() {
    return (
       <div className="bank-transfer">
         <form className="bank-transfer__form" onSubmit={this.doTransfer}>
           <fieldset className="bank-transfer__fieldset">
             <legend>Transfer</legend>
             <input className="bank-transfer__amount"
                    type="text"
                    ref="amount"
                    placeholder="Amount to transfer"/>
             <input className="bank-transfer__account-number"
                    type="text"
                    ref="accountNumber"
                    placeholder="Enter the recipient's account number"/>
             <input className="bank-transfer__submit"
                    type="submit"
                    value="Make Transfer"/>
           </fieldset>
         </form>
       </div>
    );
  }
});