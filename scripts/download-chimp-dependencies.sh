#!/usr/bin/env bash

# Guarantee a directory that contains no tests
mkdir ./tmp

# Run Chimp with the no-test directory. Chimp will start and download any dependencies
./node_modules/.bin/chimp --path=./tmp

# Clean up
rm -rf ./tmp
