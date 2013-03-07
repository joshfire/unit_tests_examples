#!/bin/bash

cd $(dirname $0)

## setup

NODE_VERSION=0.8


## node
## assumes we do have nvm installed in ~/.nvm/nvm.sh

. ~/.nvm/nvm.sh
nvm install ${NODE_VERSION}  # may fail if already installed, but no error code returned
nvm use ${NODE_VERSION}
pushd .. 2>/dev/null
npm install
popd 2>/dev/null
npm install -g jasmine-node
npm install -g mocha



## python
## assumes we do have virtualenv

mkdir -p python
virtualenv python
. ./python/bin/activate
pip install -U --use-mirrors -r ./python-requirements.txt



## global activate file

rm -f ./activate
cat << EOF >> ./activate
. ${PWD}/python/bin/activate
. ~/.nvm/nvm.sh
nvm use ${NODE_VERSION}
EOF
chmod +x ./activate
