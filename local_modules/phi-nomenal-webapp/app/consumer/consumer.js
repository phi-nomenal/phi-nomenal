import React from 'react'
import { render } from 'react-dom'
import RFQForm from './RFQForm'
import QuotationsModel from '../model/QuotationsModel'
import './consumer.css'

class Consumer extends React.Component {
  constructor () {
    super()
    this.state = { step: 'choose-product' }
    this.onProductChosen = this.onProductChosen.bind(this)
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
    return <div id='consumer-choose-shipment' className='consumer-choose'>
      <input id='slider' type='range' />
    </div>
  }
}

export default Consumer
