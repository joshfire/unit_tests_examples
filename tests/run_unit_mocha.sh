#!/bin/bash

# setup env : go to the root of the project and activate stuff
cd "$(dirname $0)/../"
. ./setup/activate

# cleanup output directory
rm -rf ./tests/output
mkdir -p ./tests/output

mocha --ui tdd ./tests/unit_mocha/ --reporter xunit > ./tests/output/unit_mocha.xml
