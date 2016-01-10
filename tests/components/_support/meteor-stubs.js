var global = window || global;

var emptyFunction = function () {
};

const Meteor = {
  userId: emptyFunction,
  call: emptyFunction,
  subscribe: emptyFunction
};

Meteor.startup = function (func) {
  func();
};

global.Meteor = Meteor;