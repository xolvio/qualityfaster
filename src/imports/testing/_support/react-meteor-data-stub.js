var global = window || global;

const ReactMeteorData = {};

ReactMeteorData.componentWillMount = function () {
  this.data = this.props.meteorData;
};

global.ReactMeteorData = ReactMeteorData;