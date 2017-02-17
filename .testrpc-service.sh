#!/bin/bash

function runTestRpc() {
    (cd local_modules/phi-nomenal-contracts && ./node_modules/.bin/testrpc)
}

trap runTestRpc EXIT
runTestRpc
