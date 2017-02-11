import React from 'react'

class OrderNumberForm extends React.Component {
  constructor(props) {
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
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <label>Enter your order number:</label>
      <input name='ordernr' type='text' value={this.state.ordernr} onChange={this.handleInputChange}/>
      <input className='submit' type='submit' value='Find order'/>
    </form>
  }
}

export default OrderNumberForm
