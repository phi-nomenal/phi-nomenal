import { OrderHistory, OrderHistoryLeg, Location } from './Contracts'

export default class OrderHistoryModel {
  orderHistory

  static async create () {
    let history = await OrderHistory.deployed()
    return new OrderHistoryModel(history)
  }

  constructor (orderHistory) {
    this.orderHistory = orderHistory
  }

  async getLegs () {
    let result = []
    let amount = await this.orderHistory.amountOfLegs()
    for (let i = 0; i < amount; i++) {
      let legAddress = await this.orderHistory.getLeg(i)
      let leg = OrderHistoryLeg.at(legAddress)
      let from = Location.at(await leg.from())
      let to = Location.at(await leg.to())
      result.push({
        mode: (await leg.mode()).toNumber(),
        distance: (await leg.distance()).toNumber(),
        co2emission: (await leg.co2emission()).toNumber(),
        from: {
          locationType: (await from.locationType()).toNumber(),
          geolocation: await from.geolocation()
        },
        to: {
          locationType: (await to.locationType()).toNumber(),
          geolocation: await to.geolocation()
        }
      })
    }
    return result
  }
}
