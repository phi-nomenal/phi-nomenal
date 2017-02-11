import React from 'react'
import './tracker.css'
import OrderNumberForm from './OrderNumberForm'

class Tracker extends React.Component {
  render () {
    return <div id='tracker-ui'>
      <h1>Order Tracking</h1>
      <OrderNumberForm />
    </div>
  }
}

export default Tracker
