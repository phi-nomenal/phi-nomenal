const RFQRegistry = artifacts.require('./RFQRegistry.sol')

module.exports = function (deployer) {
  deployer.deploy(RFQRegistry)
}
