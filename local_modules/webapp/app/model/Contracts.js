import Web3 from 'web3'
import contract from 'truffle-contract'

import RFQRegistryJSON from 'contracts/build/contracts/RFQRegistry.json'
import RFQJSON from 'contracts/build/contracts/RFQ.json'

const RFQRegistry = contract(RFQRegistryJSON)
const RFQ = contract(RFQJSON)

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
RFQRegistry.setProvider(provider)
RFQ.setProvider(provider)

export { RFQ, RFQRegistry }
