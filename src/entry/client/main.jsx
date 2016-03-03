import {App} from '../../imports/ui/components/app.jsx';
import '../../imports/infrastructure/collections';
import '../../imports/infrastructure/client/subscriptions';

Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  ReactDOM.render(<App />, document.getElementById('render-target'));
});