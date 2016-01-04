You can mostly ignore this folder.

Inside the `jasmine/server/integration` directory, you'll find symlinks to directories under `/tests/components`. 

This directory is temporary. We are currently using Velocity to run in-context tests using Jasmine. When the MDG release the new app-level testing changes in Meteor 1.3 we will likely change this mode to use the one provided by 1.3, and probably with some module magic to allow us to test without Meteor.