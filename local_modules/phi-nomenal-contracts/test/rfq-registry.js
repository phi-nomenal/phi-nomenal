const beforeEach = require('mocha').beforeEach
const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const RFQRegistry = artifacts.require('RFQRegistry')
const RFQ = artifacts.require('RFQ')

contract('RFQRegistry', function () {
  let registry

  beforeEach(function () {
    return RFQRegistry.new()
      .then(function (instance) { registry = instance })
  })

  describe('registration of an RFQ', function () {
    let rfq

    beforeEach(function () {
      return RFQ.new('EAN1234', 1, 'Amsterdam')
        .then(function (instance) { rfq = instance })
        .then(function () { return registry.register(rfq.address) })
    })

    it('increases the amount of open RFQs', function () {
      return registry.amountOfOpenRFQs()
        .then(function (amount) { expect(amount.toNumber()).to.equal(1) })
    })

    it('adds it to the list of open RFQs', function () {
      return registry.openRFQs(0)
        .then(function (openRFQ) { expect(openRFQ).to.equal(rfq.address) })
    })
  })
})
