#!/usr/bin/env bash

# Go into the directory where the Meteor app resides
cd src

# Use Node.js to decode the Base64 environment variable called METEOR_SESSION_FILE and write it to a file called meteor-session-file.json
node -e "console.log(new Buffer(process.env.METEOR_SESSION_FILE_CONTENT, 'Base64').toString('utf-8'))" > src/meteor-session-file.json

# Next we tell Meteor deploy to use the session file, to deploy to the $DEPLOY_SITE
DEPLOY_HOSTNAME=galaxy.meteor.com METEOR_SESSION_FILE=meteor-session-file.json meteor deploy $DEPLOY_SITE:
