import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

class Home extends React.Component {
    render() {
      return <div>
        <h1>ϕ-Nomenal</h1>
        <p>Choose your view:</p>
        <ul>
          <li><Link to='/god'>God</Link></li>
          <li><Link to='/consumer'>Consumer</Link></li>
        </ul>
      </div>
    }
}

export default Home
