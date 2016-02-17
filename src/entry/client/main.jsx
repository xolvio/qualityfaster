import {App} from '/imports/client/components/app.jsx'

Meteor.subscribe('myAccount');

Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  ReactDOM.render(<App />, document.getElementById('render-target'));
});