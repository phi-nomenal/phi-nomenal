import React from 'react'
import { render } from 'react-dom'
import RfqRegistryModel from '../model/RfqRegistryModel'

class God extends React.Component {

  constructor () {
    super()
    this.state = { rfqs: [] }
  }

  componentDidMount () {
    this.loadOpenRFQs()
  }

  async loadOpenRFQs () {
    let registry = await RfqRegistryModel.create()
    let openRFQs = await registry.openRFQs()
    this.setState({ rfqs: openRFQs })
  }

  render () {
    let rfqs = this.state.rfqs
    return <div>{ rfqs.map(this.renderRfq) }</div>
  }

  renderRfq (rfq) {
    return <h1 key={rfq.id}>{
      'product: ' + rfq.product +
      ', amount: ' + rfq.amount +
      ', delivery region: ' +
      rfq.deliveryRegion
    }</h1>
  }
}

export default God
