import React from 'react'
import { render } from 'react-dom'
import { RFQ, RFQRegistry, accounts } from '../model/Contracts'
import './RFQForm.css'

class RFQForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {product: '', amount: 1, deliveryRegion: ''}

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    this.setState({[target.name]: target.value})
  }

  async handleSubmit (event) {
    let rfq = await RFQ.new(
      this.state.product,
      this.state.amount,
      this.state.deliveryRegion, {from: accounts[0], gas: 400000})
    let registry = await RFQRegistry.deployed()
    await registry.register(rfq.address, {from: accounts[0]})
    event.preventDefault()
  }

  render () {
    return <form onSubmit={this.handleSubmit}>
      <div className='formElem'>
        <label>Product:</label>
        <input name='product' type='text' value={this.state.product} onChange={this.handleInputChange} />
      </div>
      <div className='formElem'>
        <label>Amount:</label>
        <input name='amount' type='text' value={this.state.amount} onChange={this.handleInputChange} />
      </div>
      <div className='formElem'>
        <label>Delivery region:</label>
        <input name='deliveryRegion' type='text' value={this.state.deliveryRegion} onChange={this.handleInputChange} />
      </div>
      <div className='formElem'>
        <label>&nbsp;</label>
        <input className='submit' type='submit' value='Create RFQ' />
      </div>
    </form>
  }
}

export default RFQForm
