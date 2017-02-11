/* eslint-env mocha */
import RfqRegistryModel from '../app/model/RfqRegistryModel'
import { RFQ, RFQRegistry } from '../app/model/Contracts'

import { expect } from 'chai'
import td from 'testdouble'

describe('RFQ Registry', function () {
  let rfqRegistryModel
  let registryMock

  beforeEach(async function () {
    registryMock = td.object(RFQRegistry)
    rfqRegistryModel = new RfqRegistryModel(registryMock)
  })

  it('is empty', async function () {
    expect(await rfqRegistryModel.openRFQs()).to.eql([])
  })

  context('when there are two RFQs in the registry', function () {
    let address1 = '0x1'
    let address2 = '0x2'
    let product1 = 'product 1'
    let amount1 = 1
    let region1 = 'region 1'
    let product2 = 'product 2'
    let amount2 = 2
    let region2 = 'region 2'

    beforeEach(function () {
      const rfq1 = td.object(RFQ)
      const rfq2 = td.object(RFQ)

      td.replace(RFQ, 'at')
      td.when(RFQ.at(address1)).thenReturn(rfq1)
      td.when(RFQ.at(address2)).thenReturn(rfq2)

      td.when(registryMock.amountOfOpenRFQs()).thenReturn(Promise.resolve(2))
      td.when(registryMock.openRFQs(0)).thenReturn(Promise.resolve(address1))
      td.when(registryMock.openRFQs(1)).thenReturn(Promise.resolve(address2))
      td.when(rfq1.product()).thenReturn(Promise.resolve(product1))
      td.when(rfq1.amount()).thenReturn(Promise.resolve(amount1))
      td.when(rfq1.deliveryRegion()).thenReturn(Promise.resolve(region1))
      td.when(rfq2.product()).thenReturn(Promise.resolve(product2))
      td.when(rfq2.amount()).thenReturn(Promise.resolve(amount2))
      td.when(rfq2.deliveryRegion()).thenReturn(Promise.resolve(region2))
    })

    afterEach(function () {
      td.reset()
    })

    it('returns an array with two elements', async function () {
      let expected = [
        {
          id: address1,
          product: product1,
          amount: amount1,
          deliveryRegion: region1
        },
        {
          id: address2,
          product: product2,
          amount: amount2,
          deliveryRegion: region2
        }
      ]
      expect(await rfqRegistryModel.openRFQs()).to.eql(expected)
    })
  })
})
