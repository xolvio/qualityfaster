#!/bin/bash

if [ -f ~/.meteor/meteor ]
then
    echo `~/.meteor/meteor --version` is installed, restoring link
	sudo ln -s ~/.meteor/meteor /usr/local/bin/meteor
else
    echo Installing Meteor
	curl https://install.meteor.com | sh
fi
