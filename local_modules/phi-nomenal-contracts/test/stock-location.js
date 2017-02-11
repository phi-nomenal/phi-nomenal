const beforeEach = require('mocha').beforeEach
const it = require('mocha').it
const describe = require('mocha').describe
const expect = require('chai').expect
const StockLocation = artifacts.require('StockLocation')
const Product = artifacts.require('Product')

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

  it('has zero stock', function () {
    return stockLocation.stockSize().then(function (stockSize) {
      return expect(stockSize.toNumber()).to.eql(0)
    })
  })

  describe('adding products', function () {
    let product

    beforeEach(function () {
      return Product.new('Sonicare')
        .then(function (instance) { product = instance })
        .then(function () { return stockLocation.addStock(product.address) })
    })

    it('has one product in stock', function () {
      return stockLocation.stockSize().then(function (stockSize) {
        return expect(stockSize.toNumber()).to.eql(1)
      })
    })
  })
})
