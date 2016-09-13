#!/bin/bash

if [ -f ~/.meteor/meteor ]
then
    echo Meteor installed, restoring link
	sudo ln -s ~/.meteor/meteor /usr/local/bin/meteor
	echo Restored link
else
    echo Installing Meteor
	curl https://install.meteor.com | sh
	echo Installed Meteor
fi

echo ~/.meteor/meteor --version
~/.meteor/meteor --version

echo /usr/local/bin/meteor --version
/usr/local/bin/meteor --version

echo which meteor
which meteor

echo meteor --version
meteor --version
