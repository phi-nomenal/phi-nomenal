const beforeEach = require('mocha').beforeEach
const it = require('mocha').it
const describe = require('mocha').describe
const expect = require('chai').expect
const MatchingEngine = artifacts.require('MatchingEngine')
const Quotation = artifacts.require('Quotation')
const RFQ = artifacts.require('RFQ')

contract('MatchingEngine', function () {
  let matchingEngine
  let initialAmount

  beforeEach(function () {
    return MatchingEngine.new()
      .then(function (instance) { matchingEngine = instance })
      .then(function () { return matchingEngine.amountOfQuotations() })
      .then(function (amount) {
        initialAmount = amount.toNumber()
      })
  })

  it('has no quotations initially', function () {
    return matchingEngine.amountOfQuotations().then(function (retrievedAmount) {
      expect(retrievedAmount.toNumber()).to.eql(initialAmount)
    })
  })

  describe('when a quotation is added', function () {
    let quotation
    const deliveryDate = 'test delivery date'
    const greenness = 75

    beforeEach(function () {
      return Quotation.new(greenness, deliveryDate)
        .then(function (instance) { quotation = instance })
        .then(function () { return matchingEngine.addQuotation(quotation.address) })
    })

    it('has one quotation', function () {
      return matchingEngine.amountOfQuotations().then(function (retrievedAmount) {
        expect(retrievedAmount.toNumber()).to.eql(initialAmount + 1)
      })
    })

    describe('given an RFQ', function () {
      let rfq

      beforeEach(function () {
        return RFQ.new('Sonicare', 1, 'The Big Building')
          .then(function (instance) { rfq = instance })
      })

      it('can retrieve the quotations', function () {
        return matchingEngine.getAmountOfQuotations(rfq.address)
          .then(function (amount) {
            return matchingEngine.getQuotation(
              rfq.address,
              amount.toNumber() - 1
            )
          })
          .then(function (retrievedQuotationAddress) {
            return Quotation.at(retrievedQuotationAddress)
          })
          .then(function (retrievedQuotation) {
            return retrievedQuotation.deliveryDate()
          })
          .then(function (actualDeliveryDate) {
            expect(actualDeliveryDate).to.eql(deliveryDate)
          })
      })
    })
  })
})
