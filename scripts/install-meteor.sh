#!/bin/bash

if [ -f ~/.meteor/meteor ]
then
    echo `~/.meteor/meteor --version` found, restoring symlink
	sudo ln -s ~/.meteor/meteor /usr/local/bin/meteor
else
    echo Installing Meteor
	curl https://install.meteor.com | sh
fi
