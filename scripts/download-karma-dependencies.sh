#!/usr/bin/env bash

echo Starting Karma without any tests to download dependencies
./node_modules/.bin/karma start ./config/karma.config.js --no-fail-on-empty-test-suite --reporters=quiet
