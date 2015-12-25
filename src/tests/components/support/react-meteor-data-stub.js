var emptyFunction= function() {};

ReactMeteorData = {};

// place holder so we can spy and return values in specs
ReactMeteorData.data = emptyFunction;

ReactMeteorData.componentWillMount = function () {
  this.data = ReactMeteorData.data();
};