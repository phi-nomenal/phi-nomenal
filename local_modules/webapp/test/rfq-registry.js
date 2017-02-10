/* eslint-env mocha */
import { expect } from 'chai'
import rfqRegistry from '../app/model/RfqRegistry'

describe('RFQ Registry', function () {
  it('is empty', function () {
    expect(rfqRegistry.openRFQs()).to.eql([])
  })
})
