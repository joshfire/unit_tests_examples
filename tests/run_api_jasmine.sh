#!/bin/bash

# setup env : go to the root of the project and activate stuff
cd "$(dirname $0)/../"
. ./setup/activate
mkdir -p ./tests/output

jasmine-node ./tests/api_jasmine --forceexit --junitreport --output ./tests/output/
