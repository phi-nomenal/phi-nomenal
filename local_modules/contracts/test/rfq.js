const it = require('mocha').it
const expect = require('chai').expect
const RFQ = artifacts.require('RFQ')

contract('RFQ', function () {
  it('can be created', function () {
    return RFQ.new().then(function (rfq) {
      expect(rfq).to.exist
    })
  })
})
