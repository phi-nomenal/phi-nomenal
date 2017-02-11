const beforeEach = require('mocha').beforeEach
const it = require('mocha').it
// const describe = require('mocha').describe
const expect = require('chai').expect
const OrderHistoryLeg = artifacts.require('OrderHistoryLeg')
const Location = artifacts.require('Location')

contract('OrderHistoryLeg', function () {
  const mode = 2
  const distance = 4242
  const co2emission = 42

  const fromType = 1
  const fromGeolocation = 'from'
  const toType = 2
  const toGeolocation = 'to'

  let fromLocation
  let toLocation
  let leg

  beforeEach(function () {
    return Location.new(fromType, fromGeolocation)
      .then(function (fromInstance) { fromLocation = fromInstance })
      .then(function () { return Location.new(toType, toGeolocation) })
      .then(function (toInstance) { toLocation = toInstance })
      .then(function () {
        return OrderHistoryLeg.new(
          mode, distance, co2emission,
          fromLocation.address, toLocation.address)
      })
      .then(function (legInstance) { leg = legInstance })
  })

  it('contains a mode', function () {
    return leg.mode().then(function (actualMode) {
      expect(actualMode.toNumber()).to.eql(mode)
    })
  })

  it('contains a distance', function () {
    return leg.distance().then(function (actualDistance) {
      expect(actualDistance.toNumber()).to.eql(distance)
    })
  })

  it('contains a CO2 emission', function () {
    return leg.co2emission().then(function (actualEmission) {
      expect(actualEmission.toNumber()).to.eql(co2emission)
    })
  })

  it('contains a from location', function () {
    return leg.from().then(function (fromAddress) {
      expect(fromAddress).to.eql(fromLocation.address)
    })
  })

  it('contains a to location', function () {
    return leg.to().then(function (toAddress) {
      expect(toAddress).to.eql(toLocation.address)
    })
  })
})
