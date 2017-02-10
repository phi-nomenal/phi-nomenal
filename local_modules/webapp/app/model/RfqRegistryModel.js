import { RFQ, RFQRegistry } from './Contracts'

class RfqRegistryModel {
  deployedContract

  constructor() {
     this.deployedContract = RFQRegistry.deployed()
  }

  async openRFQs() {
    let result = []
    let amount = await this.deployedContract.amountOfOpenRFQs()
    for (let i=0; i<amount; i++) {
      let rfqAddress = await this.deployedContract.openRFQs(i)
      let rfq = RFQ.at(rfqAddress)
      let product = await rfq.product()
      let amount = await rfq.amount()
      let region = await rfq.deliveryRegion()
      result.push({
        product: product,
        amount: amount,
        deliveryRegion: region
      })
    }
    return result
  }
}

export default new RfqRegistryModel()
