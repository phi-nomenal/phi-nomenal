import React from 'react'

class OrderNumberForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { ordernr: '' }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    this.setState({[target.name]: target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    this.notifyCallback()
  }

  notifyCallback () {
    if (this.props.onOrderNumberEntered) {
      this.props.onOrderNumberEntered()
    }
  }

  render () {
    return <form id='order-number-form' onSubmit={this.handleSubmit}>
      <input name='ordernr' type='text' value={this.state.ordernr} onChange={this.handleInputChange} />
      <input className='submit' type='submit' value='🔎' />
    </form>
  }
}

OrderNumberForm.propTypes = {
  onOrderNumberEntered: React.PropTypes.func
}

export default OrderNumberForm
