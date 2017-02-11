import React from 'react'
import { render } from 'react-dom'
import RFQForm from './RFQForm'
import './consumer.css'

class Consumer extends React.Component {
  render () {
    return <div id='consumer-ui-wrapper'><div id='consumer-ui'>
      <h1>Consumer</h1>
      <h2>Create new RFQ</h2>
      <RFQForm />
    </div></div>
  }
}

export default Consumer
