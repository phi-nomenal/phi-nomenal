#!/bin/bash

./.testrpc-service.sh &
sleep 5
( cd local_modules/phi-nomenal-contracts && ./node_modules/.bin/truffle migrate )
./node_modules/.bin/lm install -f
( cd local_modules/phi-nomenal-webapp && ./node_modules/.bin/webpack )
( cd local_modules/phi-nomenal-httpserver && yarn start )
