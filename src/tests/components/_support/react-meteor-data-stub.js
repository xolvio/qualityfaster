ReactMeteorData = {};
ReactMeteorData.data = emptyFunction;
ReactMeteorData.componentWillMount = function () {
  this.data = ReactMeteorData.data();
};