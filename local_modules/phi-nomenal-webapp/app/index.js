import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, hashHistory, IndexRoute } from 'react-router'

import Home from './home'
import App from './app'
import Consumer from './consumer/consumer'
import God from './god/god'
import Tracker from './tracker/tracker'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/consumer' component={Consumer} />
      <Route path='/god' component={God} />
      <Route path='/tracking' component={Tracker} />
    </Route>
  </Router>
, document.getElementById('root'))
