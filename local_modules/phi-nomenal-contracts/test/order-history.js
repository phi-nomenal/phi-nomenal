const beforeEach = require('mocha').beforeEach
const it = require('mocha').it
const describe = require('mocha').describe
const expect = require('chai').expect
const OrderHistory = artifacts.require('OrderHistory')
const OrderHistoryLeg = artifacts.require('OrderHistoryLeg')
const Location = artifacts.require('Location')

contract('OrderHistory', function () {
  let orderHistory

  beforeEach(function () {
    return OrderHistory.new().then(function (instance) {
      orderHistory = instance
    })
  })

  it('has no legs initially', function () {
    return orderHistory.amountOfLegs().then(function (amount) {
      expect(amount.toNumber()).to.eql(0)
    })
  })

  describe('after adding a leg', function () {
    let fromLocation
    let toLocation
    let leg

    beforeEach(function () {
      return Location.new(0, 'from')
        .then(function (fromInstance) { fromLocation = fromInstance })
        .then(function () { return Location.new(1, 'to') })
        .then(function (toInstance) { toLocation = toInstance })
        .then(function () {
          return OrderHistoryLeg.new(
            2, 500, 42,
            fromLocation.address, toLocation.address)
        })
        .then(function (legInstance) { leg = legInstance })
        .then(function () { return orderHistory.add(leg.address) })
    })

    it('has a leg', function () {
      return orderHistory.amountOfLegs().then(function (amount) {
        expect(amount.toNumber()).to.eql(1)
      })
    })
  })
})
