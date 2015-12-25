AccountSummaryHelper = {
  getMeteorData: function () {
    if (Meteor.userId()) {
      return AccountHolders.findOne().account;
    }
    return {
      balance: 0
    };
  }
};

AccountSummary = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData: AccountSummaryHelper.getMeteorData,
  render() {
    return (
       <div className="account-summary">
         $ <span className="account-summary__balance">{this.data.balance}</span>
       </div>
    );
  }
});
