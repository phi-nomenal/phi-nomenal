import { Quotation } from './Contracts'

export default class QuotationsModel {

  matchingEngine

  constructor (matchingEngine) {
    this.matchingEngine = matchingEngine
  }

  async getQuotations (rfq) {
    let result = []
    let amount = await this.matchingEngine.getAmountOfQuotations(rfq.address)
    for (let i = 0; i < amount; i++) {
      let quotationAddress = await this.matchingEngine.getQuotation(rfq.address, i)
      let quotation = Quotation.at(quotationAddress)
      result.push({
        greenness: await quotation.greenness(),
        deliveryDate: await quotation.deliveryDate()
      })
    }
    return result
  }
}
