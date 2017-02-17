#!/bin/bash

./.testrpc-service.sh &
sleep 5
( cd local_modules/phi-nomenal-contracts && ./node_modules/.bin/truffle migrate )
( cd local_modules/phi-nomenal-httpserver && yarn start )
