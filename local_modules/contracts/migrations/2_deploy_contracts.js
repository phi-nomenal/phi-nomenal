const RFQ = artifacts.require('./RFQ.sol')

module.exports = function (deployer) {
  deployer.deploy(RFQ)
}
