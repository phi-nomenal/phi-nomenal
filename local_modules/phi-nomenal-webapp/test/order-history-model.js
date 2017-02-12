/* eslint-env mocha */
import OrderHistoryModel from '../app/model/OrderHistoryModel'
import { OrderHistory, OrderHistoryLeg, Location } from '../app/model/Contracts'
import chai, { expect } from 'chai'
import chaiSubset from 'chai-subset'
import td from 'testdouble'
import BigNumber from 'bignumber.js'

chai.use(chaiSubset)

describe('OrderHistoryModel', function () {
  let orderHistoryModel
  let orderHistoryMock

  beforeEach(function () {
    orderHistoryMock = td.object(OrderHistory)
    orderHistoryModel = new OrderHistoryModel(orderHistoryMock)
  })

  it('is empty', async function () {
    expect(await orderHistoryModel.getLegs()).to.containSubset({legs: []})
  })

  context('when there is a leg', function () {
    let from
    let to
    let leg
    const mode = 1
    const distance = 4242
    const co2emission = 42
    const fromType = 2
    const fromGeolocation = 'from'
    const toType = 3
    const toGeolocation = 'to'

    beforeEach(function () {
      from = td.object(Location)
      to = td.object(Location)
      td.replace(Location, 'at')
      td.when(Location.at(from.address)).thenReturn(from)
      td.when(Location.at(to.address)).thenReturn(to)
      td.when(from.locationType()).thenReturn(Promise.resolve(new BigNumber(fromType)))
      td.when(from.geolocation()).thenReturn(Promise.resolve(fromGeolocation))
      td.when(to.locationType()).thenReturn(Promise.resolve(new BigNumber(toType)))
      td.when(to.geolocation()).thenReturn(Promise.resolve(toGeolocation))

      leg = td.object(OrderHistoryLeg)
      td.replace(OrderHistoryLeg, 'at')
      td.when(OrderHistoryLeg.at(leg.address)).thenReturn(leg)
      td.when(leg.mode()).thenReturn(Promise.resolve(new BigNumber(mode)))
      td.when(leg.distance()).thenReturn(Promise.resolve(new BigNumber(distance)))
      td.when(leg.co2emission()).thenReturn(Promise.resolve(new BigNumber(co2emission)))
      td.when(leg.from()).thenReturn(Promise.resolve(from.address))
      td.when(leg.to()).thenReturn(Promise.resolve(to.address))

      td.when(orderHistoryMock.amountOfLegs()).thenReturn(Promise.resolve(1))
      td.when(orderHistoryMock.legs(0)).thenReturn(Promise.resolve(leg.address))
    })

    afterEach(function () {
      td.reset()
    })

    it('retrieves legs from the order history', async function () {
      let expected = { legs: [
        {
          id: leg.address,
          mode: mode,
          distance: distance,
          co2emission: co2emission,
          from: { locationType: fromType, geolocation: fromGeolocation },
          to: { locationType: toType, geolocation: toGeolocation }
        }
      ]}
      let actual = await orderHistoryModel.getLegs()
      expect(actual).to.containSubset(expected)
    })

    it('calculates the total co2emission', async function () {
      let history = await orderHistoryModel.getLegs()
      expect(history).to.containSubset({
        totals: {
          co2emission: co2emission,
          distance: distance
        }
      })
    })
  })
})
