This directory contains the component tests. 

The tests under the `ui` directory are React unit tests and are run using either Karma or Wallaby locally, and using Karma on the CI server. These tests run without needing a Meteor context.
 
The tests under `models` and `services` are app-level tests and are run using Velocity both locally and on CI. These tests currently need a Meteor context to run. 

The use of Velocity is a temporary solution for doing in-context testing with Meteor until the MDG release Meteor 1.3, which has support for app-level testing. The 1.3 release also contains module support which may allow us to run these tests as pure unit tests.

Note that the `models` and `services` directories are sym-linked inside the `src/tests/jasmine/server/integration` directory until we decommision Velocity.