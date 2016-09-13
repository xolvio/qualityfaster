#!/usr/bin/env bash

# Go into the directory where the Meteor app resides
cd src

# Use Node.js to decode the Base64 environment variable called METEOR_SESSION_FILE and write it to a file called meteor-session-file.json
echo Writing Meteor session file
node -e "console.log(new Buffer(process.env.METEOR_SESSION_FILE_CONTENT, 'Base64').toString('utf-8'))" > meteor-session-file.json

# Disable the pretty format to reduce the noise on the CI logs
export METEOR_PRETTY_OUTPUT=0

# Let Meteor know we are dploying to Galaxy
export DEPLOY_HOSTNAME=galaxy.meteor.com

# Log in to Galaxy on CI without user input
export METEOR_SESSION_FILE=meteor-session-file.json

echo Deploying to $DEPLOY_SITE on Galaxy
meteor deploy $DEPLOY_SITE
