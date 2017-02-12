import { OrderHistory, OrderHistoryLeg, Location, accounts } from './Contracts'

export default class OrderHistoryModel {
  orderHistory

  static async create () {
    let history = await OrderHistory.new({from: accounts[0], gas: 4000000})
    await history.addDemoData({from: accounts[0], gas: 4000000})
    return new OrderHistoryModel(history)
  }

  constructor (orderHistory) {
    this.orderHistory = orderHistory
  }

  async getLegs () {
    let legs = await this.retrieveLegs()
    let totals = this.calculateTotals(legs)
    return {
      legs: legs,
      totals: totals
    }
  }

  async retrieveLegs () {
    let result = []
    let amount = await this.orderHistory.amountOfLegs()
    for (let i = 0; i < amount; i++) {
      let legAddress = await this.orderHistory.legs(i)
      let leg = OrderHistoryLeg.at(legAddress)
      let from = Location.at(await leg.from())
      let to = Location.at(await leg.to())
      result.push({
        id: leg.address,
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

  calculateTotals (legs) {
    let totalEmission = 0
    let totalDistance = 0
    for (let leg of legs) {
      totalEmission += leg.co2emission
      totalDistance += leg.distance
    }
    return {
      co2emission: totalEmission,
      distance: totalDistance
    }
  }
}
