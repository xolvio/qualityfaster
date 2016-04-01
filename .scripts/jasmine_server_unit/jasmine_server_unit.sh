#!/bin/bash
set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

export NODE_PATH=$SCRIPT_DIR/../../src/.meteor/local/build/programs/server/node_modules:$SCRIPT_DIR/../../src/node_modules:$SCRIPT_DIR/../../src/imports
meteor node $SCRIPT_DIR/jasmine_server_unit.js
