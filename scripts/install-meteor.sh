#!/usr/bin/env bash

# Restore the Meteor command if Meteor was restored from the cache
if [ -d ~/.meteor ]; then
  sudo ln -s ~/.meteor/meteor /usr/local/bin/meteor
fi

# install Meteor if it's not already restored from the cache
if [ ! -e $HOME/.meteor/meteor ]; then
  curl https://install.meteor.com | sh
fi
