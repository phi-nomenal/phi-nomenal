import contract from 'truffle-contract'

import RFQRegistryJSON from 'contracts/build/contracts/RFQRegistry.json'
import RFQJSON from 'contracts/build/contracts/RFQ.json'

const RFQRegistry = contract(RFQRegistryJSON)
const RFQ = contract(RFQJSON)

export { RFQ, RFQRegistry }
