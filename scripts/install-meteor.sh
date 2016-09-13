#!/usr/bin/env bash

# Restore the Meteor command if Meteor was restored from the cache
#if [ -d ~/.meteor ]; then
#  sudo ln -s ~/.meteor/meteor /usr/local/bin/meteor
#fi

# Install Meteor if it's not already restored from the cache

if [ ! -f ~/.meteor/meteor ]; then
  curl https://install.meteor.com | sh
fi

which meteor

cat `which meteor`

# Output the Meteor version after the install / restore from cache
meteor --version
