import Web3 from 'web3'
import contract from 'truffle-contract'

import RFQRegistryJSON from 'contracts/build/contracts/RFQRegistry.json'
import RFQJSON from 'contracts/build/contracts/RFQ.json'

const RFQRegistry = contract(RFQRegistryJSON)
const RFQ = contract(RFQJSON)

const web3Location = 'http://localhost:8545'
var web3Provided
// Supports Metamask and Mist, and other wallets that provide 'web3'.
if (typeof web3 !== 'undefined') {
  // Use the Mist/wallet provider.
  // eslint-disable-next-line
  web3Provided = new Web3(web3.currentProvider)
} else {
  web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location))
}
RFQRegistry.setProvider(web3Provided.currentProvider)
RFQ.setProvider(web3Provided.currentProvider)

const accounts = web3Provided.eth.accounts

export { RFQ, RFQRegistry, accounts }
