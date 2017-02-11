import React from 'react'
import './tracker.css'
import OrderNumberForm from './OrderNumberForm'

class Tracker extends React.Component {
  constructor (props) {
    super(props)
    this.state = { step: '' }
  }

  render () {
    return <div id='tracker-ui'>{ this.renderStep() }</div>
  }

  renderStep () {
    if (this.state.step === 'show-tracking-info') {
      return this.renderTrackingInfo()
    } else {
      return this.renderSearchForm()
    }
  }

  renderSearchForm () {
    let onOrderNumberEntered = function () {
      this.setState({ step: 'show-tracking-info' })
    }.bind(this)
    return <div><h1>Order Tracking</h1>
      <OrderNumberForm onOrderNumberEntered={onOrderNumberEntered} />
    </div>
  }

  renderTrackingInfo () {
    return <table>
      <thead>
        <tr><td>Description</td><td>Transportation</td><td className='numeric'>CO<sub>2</sub> Emission</td></tr>
      </thead>
      <tbody>
        <tr><td>From factory to warehouse</td><td>airplane</td><td className='numeric'>34</td></tr>
        <tr><td>From warehouse to retailer</td><td>truck</td><td className='numeric'>72</td></tr>
        <tr><td>From retailer to destination</td><td>bike</td><td className='numeric'>3</td></tr>
        <tr><td /><td /><td className='totals numeric'><strong>109</strong></td></tr>
      </tbody>
    </table>
  }
}

export default Tracker
