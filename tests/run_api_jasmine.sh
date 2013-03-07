#!/bin/bash

# setup env : go to the root of the project and activate stuff
cd "$(dirname $0)/../"
. ./setup/activate

# cleanup output directory
rm -rf ./tests/output
mkdir -p ./tests/output

jasmine-node ./tests/api_jasmine --junitreport --output ./tests/output/
