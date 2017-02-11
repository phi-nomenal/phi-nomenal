const RFQRegistry = artifacts.require('./RFQRegistry.sol')
const MatchingEngine = artifacts.require('./MatchingEngine.sol')

module.exports = function (deployer) {
  deployer.deploy(RFQRegistry)
  deployer.deploy(MatchingEngine)
}
