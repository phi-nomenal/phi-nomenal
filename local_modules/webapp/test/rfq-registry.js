/* eslint-env mocha */
import contract from 'truffle-contract'
import rfqRegistryModel from '../app/model/RfqRegistryModel'
import { RFQ, RFQRegistry } from '../app/model/Contracts'

import { expect } from 'chai'
import td from 'testdouble'

describe('RFQ Registry', function () {
  it('is empty', async function () {
    rfqRegistryModel.deployedContract = td.object(RFQRegistry)
    expect(await rfqRegistryModel.openRFQs()).to.eql([])
  })

  context('when there are two RFQs in the registry', function() {
    let address1 = '0x1'
    let address2 = '0x2'
    let product1 = 'product 1'
    let amount1 = 1
    let region1 = 'region 1'
    let product2 = 'product 2'
    let amount2 = 2
    let region2 = 'region 2'

    beforeEach(function() {
      const registryMock = td.object(RFQRegistry)
      const rfq1 = td.object(RFQ)
      const rfq2 = td.object(RFQ)
      rfqRegistryModel.deployedContract = registryMock

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

    afterEach(function() {
      td.reset()
    })

    it('returns an array with two elements', async function() {
      let expected = [
        { product: product1, amount: amount1, deliveryRegion: region1 },
        { product: product2, amount: amount2, deliveryRegion: region2 }
      ]
      expect(await rfqRegistryModel.openRFQs()).to.eql(expected)
    })
  })
})
