#!/bin/bash

if [ -d ~/.meteor ]
then
    echo Meteor installed, restoring link
	sudo ln -s ~/.meteor/meteor /usr/local/bin/meteor
	echo Restored link
else
    echo Installing Meteor
	curl https://install.meteor.com | sh
	echo Installed Meteor
fi

echo Which Meteor
which meteor

echo Cat Which Meteor
cat `which meteor`

echo Meteor version
meteor --version
