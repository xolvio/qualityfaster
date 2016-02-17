import {AccountHolders} from '../collections';

Meteor.publish("myAccount", function () {
  return AccountHolders.find(this.userId);
});