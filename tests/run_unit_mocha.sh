#!/bin/bash

# setup env : go to the root of the project and activate stuff
cd "$(dirname $0)/../"
. ./setup/activate
mkdir -p ./tests/output

mocha --ui tdd ./tests/unit_mocha/ --reporter xunit > ./tests/output/unit_mocha.xml
