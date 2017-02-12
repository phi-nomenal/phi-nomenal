import React from 'react'
import './tracker.css'
import OrderNumberForm from './OrderNumberForm'
import OrderHistoryModel from '../model/OrderHistoryModel'

import './img/location-type-0.png'

class Tracker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      step: '',
      legs: [],
      totals: { co2emission: 0, distance: 0 }
    }
    this.onOrderNumberEntered = this.onOrderNumberEntered.bind(this)
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
    return <div id='tracker-ui' className='form'>
      <OrderNumberForm onOrderNumberEntered={this.onOrderNumberEntered} />
    </div>
  }

  onOrderNumberEntered () {
    this.setState({ step: 'show-tracking-info' })
    this.loadOrderHistory()
  }

  async loadOrderHistory () {
    let model = await OrderHistoryModel.create()
    let legs = await model.getLegs()
    this.setState({
      legs: legs.legs,
      totals: legs.totals
    })
  }

  renderTrackingInfo () {
    return <div id='tracker-ui' className='results'>
      <OrderNumberForm onOrderNumberEntered={this.onOrderNumberEntered} />
      { this.state.legs.map(this.renderLeg) }
      <table id='tracker-totals'>
        <tr>
          <td id='tracker-total-co2' className='tracker-total'>
            <p>{this.state.totals.co2emission}</p>
            <p>CO₂ emission</p>
          </td>
          <td id='tracker-total-distance' className='tracker-total'>
            <p>{this.state.totals.distance} Km</p>
            <p>displacement</p>
          </td>
        </tr>
      </table>
    </div>
  }

  renderLeg (leg, index) {
    return <div className={'leg leg-' + index} key={leg.id}>
      <span className={'icon location from type-' + leg.from.locationType} />
      <span className={'icon mode leg-mode-' + leg.mode} />
      <span className={'icon location to type-' + leg.to.locationType} />
      <span className='distance'>{leg.distance} km</span>
      <span className={'leafs leafs-' + (index + 1)} />
    </div>
  }
}

export default Tracker
