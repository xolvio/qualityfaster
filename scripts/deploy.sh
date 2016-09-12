#!/usr/bin/env bash

# Go into the directory where the Meteor app resides
cd src

# Use Node.js to decode the Base64 environment variable called METEOR_SESSION_FILE and write it to a file called meteor-session-file.json
echo Writing Meteor session file
node -e "console.log(process.env.METEOR_SESSION_FILE_CONTENT.substring(0, 5))"
node -e "console.log(new Buffer(process.env.METEOR_SESSION_FILE_CONTENT, 'Base64').toString('utf-8'))" > meteor-session-file.json

echo Is Meteor working?
meteor --version

echo Deploying to $DEPLOY_SITE on Galaxy
# Next we tell Meteor deploy to use the session file, to deploy to the $DEPLOY_SITE
DEPLOY_HOSTNAME=galaxy.meteor.com METEOR_SESSION_FILE=meteor-session-file.json meteor deploy $DEPLOY_SITE
