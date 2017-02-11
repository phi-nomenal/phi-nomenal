import React from 'react'
import { render } from 'react-dom'
import RFQForm from './RFQForm'
import QuotationsModel from '../model/QuotationsModel'
import QuotationSelector from '../model/QuotationSelector'
import './consumer.css'

class Consumer extends React.Component {
  constructor () {
    super()
    this.state = { step: 'choose-product' }
    this.onProductChosen = this.onProductChosen.bind(this)
    this.onSliderChanged = this.onSliderChanged.bind(this)
  }

  onProductChosen (rfq) {
    this.setState({ step: 'choose-shipment' })
    this.loadQuotations(rfq)
  }

  async loadQuotations (rfq) {
    let quotationsModel = await QuotationsModel.create()
    let quotations = await quotationsModel.getQuotations(rfq)
    this.setState({ quotations: quotations })
  }

  onSliderChanged (event) {
    this.setState({ greenness: event.target.value })
  }

  render () {
    return <div id='consumer-ui'>{ this.renderStep() }</div>
  }

  renderStep () {
    let step = this.state.step
    if (step === 'choose-product') {
      return this.renderChooseProduct()
    } else if (step === 'choose-shipment') {
      return this.renderChooseShipment()
    }
    return <div />
  }

  renderChooseProduct () {
    return <div id='consumer-choose-product' className='consumer-choose'>
      <RFQForm onRequestRegistered={this.onProductChosen} />
    </div>
  }

  renderChooseShipment () {
    let deliveryDate = this.getSelectedQuotation().deliveryDate
    return <div id='consumer-choose-shipment' className='consumer-choose'>
      <input id='slider' type='range' min='0' max='100' onChange={this.onSliderChanged} />
      <div id='delivery-date'>{ deliveryDate }</div>
    </div>
  }

  getSelectedQuotation () {
    let selector = new QuotationSelector(this.state.quotations)
    let greenness = this.state.greenness
    if (!greenness) { greenness = 50 }
    let quotation = selector.selectGreenness(greenness)
    if (!quotation) {
      quotation = { greenness: 0, deliveryDate: '' }
    }
    return quotation
  }
}

export default Consumer
