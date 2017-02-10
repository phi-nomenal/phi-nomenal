/* eslint-env mocha */
const expect = require('chai').expect
const rfqRegistry = require('../app/model/RfqRegistry')

describe('RFQ Registry', function () {
  it('is empty', function () {
    expect(rfqRegistry.openRFQs()).to.eql([])
  })
})
