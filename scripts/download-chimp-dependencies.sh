#!/usr/bin/env bash

# Guarantee a directory that contains no tests
mkdir ./tmp

echo Starting Chimp without any tests to download dependencies
./node_modules/.bin/chimp --path=./tmp

# Clean up
rm -rf ./tmp
