const beforeEach = require('mocha').beforeEach
const it = require('mocha').it
const expect = require('chai').expect
const RFQ = artifacts.require('RFQ')

contract('RFQ', function () {
  const product = 'EAN1234'
  const amount = 42
  const region = 'Eindhoven'

  let rfq

  beforeEach(function () {
    return RFQ.new(product, amount, region)
      .then(function (instance) { rfq = instance })
  })

  it('contains the product', function () {
    return rfq.product().then(function (retrievedProduct) {
      return expect(retrievedProduct).to.equal(product)
    })
  })

  it('contains the amount', function () {
    return rfq.amount().then(function (retrievedAmount) {
      return expect(retrievedAmount.toNumber()).to.equal(amount)
    })
  })

  it('contains the delivery region', function () {
    return rfq.deliveryRegion().then(function (retrievedRegion) {
      return expect(retrievedRegion).to.equal(region)
    })
  })
})
