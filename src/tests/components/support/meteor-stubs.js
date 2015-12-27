Meteor = {};
Meteor.userId = emptyFunction;
Meteor.call = emptyFunction;
Meteor.subscribe = emptyFunction;

Meteor.startup = function(func) {
  func();
};