import React from 'react'
import { render } from 'react-dom'
import './app.css'

class App extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

export default App
