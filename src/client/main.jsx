Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  ReactDOM.render(<App />, document.getElementById("render-target"));
});

Meteor.subscribe("myAccount");
