import React from 'react'
import { render } from 'react-dom'
import { RFQ, RFQRegistry, accounts } from '../model/Contracts'

class RFQForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {product: '', amount: 0, deliveryRegion: ''}

    this.handleProductChange = this.handleProductChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleDeliveryRegionChange = this.handleDeliveryRegionChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleProductChange (event) {
    this.setState({product: event.target.value})
  }

  handleAmountChange (event) {
    this.setState({amount: event.target.value})
  }

  handleDeliveryRegionChange (event) {
    this.setState({deliveryRegion: event.target.value})
  }

  async handleSubmit (event) {
    let rfq = await RFQ.new(
      this.state.product,
       this.state.amount,
       this.state.deliveryRegion, {from: accounts[0], gas: 320000})
    let registry = await RFQRegistry.deployed()
    await registry.register.call(rfq.address, {from: accounts[0]})
    event.preventDefault()
  }

  render () {
    return <form onSubmit={this.handleSubmit}>
      <div><label>
          Product:
          <input type='text' value={this.state.product} onChange={this.handleProductChange} />
      </label></div>
      <div><label>
          Amount:
          <input type='text' value={this.state.amount} onChange={this.handleAmountChange} />
      </label></div>
      <div><label>
          Delivery region:
          <input type='text' value={this.state.deliveryRegion} onChange={this.handleDeliveryRegionChange} />
      </label></div>
      <input type='submit' value='Submit' />
    </form>
  }
}

export default RFQForm
