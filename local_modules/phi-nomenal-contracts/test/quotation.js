const beforeEach = require('mocha').beforeEach
const it = require('mocha').it
const expect = require('chai').expect
const Quotation = artifacts.require('Quotation')

contract('Quotation', function () {
  let greenness = 70
  let deliveryDate = new Date(2017, 2, 11).getTime()

  let quotation

  beforeEach(function () {
    return Quotation.new(greenness, deliveryDate)
      .then(function (instance) { quotation = instance })
  })

  it('has a greenness', function () {
    return quotation.greenness().then(function (retrievedGreenness) {
      return expect(retrievedGreenness.toNumber()).to.eql(greenness)
    })
  })

  it('has a delivery date', function () {
    return quotation.deliveryDate().then(function (retrievedDate) {
      return expect(retrievedDate.toNumber()).to.eql(deliveryDate)
    })
  })
})
