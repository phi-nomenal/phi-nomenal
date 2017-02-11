/* eslint-env mocha */
import { expect } from 'chai'
import QuotationSelector from '../app/model/QuotationSelector'

describe('QuotationSelector', function () {
  it('can be created', function () {
    expect(new QuotationSelector()).to.exist
  })

  context('given a number of quotations', function () {
    const notSoGreen = { greenness: 20 }
    const quiteGreen = { greenness: 60 }
    const veryGreen = { greenness: 90 }

    let selector

    beforeEach(function () {
      selector = new QuotationSelector([veryGreen, notSoGreen, quiteGreen])
    })

    it('selects the quotation with the lowest greenness', function () {
      expect(selector.selectGreenness(0)).to.eql(notSoGreen)
    })

    it('selects the quotation with the highest greenness', function () {
      expect(selector.selectGreenness(100)).to.eql(veryGreen)
    })

    it('selects the quotation with the exact right greenness', function () {
      expect(selector.selectGreenness(60)).to.eql(quiteGreen)
    })

    it('does not select a quotation with less greenness', function () {
      expect(selector.selectGreenness(61)).to.eql(veryGreen)
    })
  })
})
