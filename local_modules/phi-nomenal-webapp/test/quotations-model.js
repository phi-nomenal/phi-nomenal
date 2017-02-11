/* eslint-env mocha */
import QuotationsModel from '../app/model/QuotationsModel'
import { MatchingEngine, RFQ, Quotation } from '../app/model/Contracts'
import { expect } from 'chai'
import td from 'testdouble'
import BigNumber from 'bignumber.js'

describe('QuotationsModel', function () {
  let quotationsModel
  let matchingEngineMock
  let rfq

  beforeEach(function () {
    matchingEngineMock = td.object(MatchingEngine)
    quotationsModel = new QuotationsModel(matchingEngineMock)
    rfq = td.object(RFQ)
  })

  it('is empty', async function () {
    expect(await quotationsModel.getQuotations(rfq)).to.eql([])
  })

  context('there is a quotation', function () {
    let quotation
    const greenness = 30
    const deliveryDate = 'tomorrow'

    beforeEach(function () {
      quotation = td.object(Quotation)
      td.replace(Quotation, 'at')
      td.when(Quotation.at(quotation.address)).thenReturn(quotation)
      td.when(quotation.greenness()).thenReturn(Promise.resolve(new BigNumber(greenness)))
      td.when(quotation.deliveryDate()).thenReturn(Promise.resolve(deliveryDate))

      td.when(matchingEngineMock.getAmountOfQuotations(rfq.address))
        .thenReturn(Promise.resolve(1))
      td.when(matchingEngineMock.getQuotation(rfq.address, 0))
        .thenReturn(Promise.resolve(quotation.address))
    })

    afterEach(function () {
      td.reset()
    })

    it('retrieves quotations from the matching engine', async function () {
      let expected = [ { greenness: greenness, deliveryDate: deliveryDate } ]
      let actual = await quotationsModel.getQuotations(rfq)
      expect(actual).to.eql(expected)
    })
  })
})
