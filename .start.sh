#!/bin/bash

./.testrpc-service.sh &
sleep 5
( cd local_modules/phi-nomenal-webapp/dist && ../node_modules/.bin/hs -p "${PORT-8080}")
