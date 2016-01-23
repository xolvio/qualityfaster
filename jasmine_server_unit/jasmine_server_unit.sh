#!/bin/bash
set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

. $NVM_DIR/nvm.sh
nvm use v0.10.40

if [ ! -e $SCRIPT_DIR/node_modules ]; then npm install; fi

export NODE_PATH=$SCRIPT_DIR/../../apps/simian/.meteor/local/build/programs/server/node_modules:$SCRIPT_DIR/../../apps/simian/modules
node $SCRIPT_DIR/jasmine_server_unit.js
