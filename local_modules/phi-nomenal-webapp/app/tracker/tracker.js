import React from 'react'
import './tracker.css'
import OrderNumberForm from './OrderNumberForm'
import OrderHistoryModel from '../model/OrderHistoryModel'

class Tracker extends React.Component {
  constructor (props) {
    super(props)
    this.state = { step: '', legs: [] }
    this.renderLeg = this.renderLeg.bind(this)
  }

  render () {
    return <div id='tracker'>
      { this.renderStep() }
    </div>
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
      this.loadOrderHistory()
    }.bind(this)
    return <div id='tracker-ui' className='form'>
      <OrderNumberForm onOrderNumberEntered={onOrderNumberEntered} />
    </div>
  }

  async loadOrderHistory () {
    let model = await OrderHistoryModel.create()
    let legs = await model.getLegs()
    this.setState({legs: legs})
  }

  renderTrackingInfo () {
    return <div id='tracker-ui' className='results'>
      { this.state.legs.map(this.renderLeg) }
    </div>
  }

  renderLeg (leg) {
    return <tr key={leg.id}>
      <td>From {leg.from.geolocation} to {leg.to.geolocation}</td>
      <td>{leg.mode}</td>
      <td className='numeric'>{leg.co2emission}</td>
    </tr>
  }
}

export default Tracker
