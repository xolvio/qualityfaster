#!/bin/bash

if [ -d ~/.meteor ]
then
    echo Meteor installed, restoring link
    # Restore the Meteor command if Meteor was restored from the cache
	ln -s ~/.meteor/meteor /usr/local/bin/meteor
else
    # Install Meteor
    echo Installing Meteor
	curl https://install.meteor.com | sh
fi

which meteor
cat `which meteor`
meteor --version
