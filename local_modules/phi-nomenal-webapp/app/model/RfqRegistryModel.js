import { RFQ, RFQRegistry } from './Contracts'

class RfqRegistryModel {
  deployedContract

  static async create () {
    let registry = await RFQRegistry.deployed()
    return new RfqRegistryModel(registry)
  }

  constructor (deployedContract) {
    this.deployedContract = deployedContract
  }

  async openRFQs () {
    let result = []
    let amount = await this.deployedContract.amountOfOpenRFQs()
    for (let i = 0; i < amount; i++) {
      let rfqAddress = await this.deployedContract.openRFQs(i)
      let rfq = RFQ.at(rfqAddress)
      let product = await rfq.product()
      let amount = await rfq.amount()
      let region = await rfq.deliveryRegion()
      result.push({
        id: rfqAddress,
        product: product,
        amount: amount,
        deliveryRegion: region
      })
    }
    return result
  }
}

export default RfqRegistryModel
