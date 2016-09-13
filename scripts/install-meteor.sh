#!/bin/bash

if [ -f ~/.meteor/meteor ]
then
    echo Meteor installed, restoring link
	sudo ln -s ~/.meteor/meteor /usr/local/bin/meteor
else
    echo Installing Meteor
	curl https://install.meteor.com | sh
fi

meteor --version
