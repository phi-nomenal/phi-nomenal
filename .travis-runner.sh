#!/bin/sh

startdir="$(cd `dirname $0`; pwd)"

( cd ${startdir}/local_modules/phi-nomenal-contracts && yarn install )
( cd ${startdir}/local_modules/phi-nomenal-contracts && yarn run testrpc & )
( cd ${startdir}/local_modules/phi-nomenal-webapp && yarn install )

yarn install

# Make sure testrpc is fully up and running
sleep 5

( cd ${startdir} && yarn test )
