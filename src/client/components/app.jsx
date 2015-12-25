App = React.createClass({
  render() {
    return (
       <div className="container">
         <header>
           <h1>Bank.io</h1>
         </header>
         <AccountSummary />
         <BankTransfer />
       </div>
    );
  }
});