const beforeEach = require('mocha').beforeEach
const it = require('mocha').it
const expect = require('chai').expect
const StockLocation = artifacts.require('StockLocation')

contract('StockLocation', function () {
  let location = 'the big building'

  let stockLocation

  beforeEach(function () {
    return StockLocation.new(location)
      .then(function (instance) { stockLocation = instance })
  })

  it('has a location', function () {
    return stockLocation.location().then(function (retrievedLocation) {
      return expect(retrievedLocation).to.eql(location)
    })
  })
})
