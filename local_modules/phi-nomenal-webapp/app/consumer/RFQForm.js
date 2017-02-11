import React from 'react'
import { render } from 'react-dom'
import { RFQ, RFQRegistry, accounts } from '../model/Contracts'
import './RFQForm.css'

class RFQForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {product: 'HX9332/04', amount: 1, deliveryRegion: 'Groningen, Netherlands'}

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    this.setState({[target.name]: target.value})
  }

  async handleSubmit (event) {
    event.preventDefault()
    let rfq = await RFQ.new(
      this.state.product,
      this.state.amount,
      this.state.deliveryRegion, {from: accounts[0], gas: 400000})
    let registry = await RFQRegistry.deployed()
    await registry.register(rfq.address, {from: accounts[0]})
    this.notifyCallback(rfq)
  }

  notifyCallback (rfq) {
    if (this.props.onRequestRegistered) {
      this.props.onRequestRegistered(rfq)
    }
  }

  render () {
    return <form onSubmit={this.handleSubmit}>
      <input name='product' type='hidden' value={this.state.product} onChange={this.handleInputChange} />
      <input name='amount' type='hidden' value={this.state.amount} onChange={this.handleInputChange} />
      <input name='deliveryRegion' type='hidden' value={this.state.deliveryRegion} onChange={this.handleInputChange} />
      <input className='submit' type='submit' value='Create RFQ' />
    </form>
  }
}

RFQForm.propTypes = {
  onRequestRegistered: React.PropTypes.func
}

export default RFQForm
