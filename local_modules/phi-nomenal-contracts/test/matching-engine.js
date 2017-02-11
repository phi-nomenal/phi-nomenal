const beforeEach = require('mocha').beforeEach
const it = require('mocha').it
const describe = require('mocha').describe
const expect = require('chai').expect
const MatchingEngine = artifacts.require('MatchingEngine')
const Quotation = artifacts.require('Quotation')

contract('MatchingEngine', function () {
  let matchingEngine
  let initialAmount

  beforeEach(function () {
    return MatchingEngine.new()
      .then(function (instance) { matchingEngine = instance })
      .then(function () { return matchingEngine.amountOfQuotations() })
      .then(function (amount) { initialAmount = amount.toNumber() })
  })

  it('has no quotations initially', function () {
    return matchingEngine.amountOfQuotations().then(function (retrievedAmount) {
      expect(retrievedAmount.toNumber()).to.eql(initialAmount)
    })
  })

  describe('when a quotation is added', function () {
    let quotation

    beforeEach(function () {
      return Quotation.new(75, new Date().getTime())
        .then(function (instance) { quotation = instance })
        .then(function () { return matchingEngine.addQuotation(quotation.address) })
    })

    it('has one quotation', function () {
      return matchingEngine.amountOfQuotations().then(function (retrievedAmount) {
        expect(retrievedAmount.toNumber()).to.eql(initialAmount + 1)
      })
    })
  })
})
