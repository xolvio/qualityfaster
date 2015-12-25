Meteor.publish("myAccount", function () {
  return AccountHolders.find(this.userId);
});