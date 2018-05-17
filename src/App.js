import React, { Component } from 'react'
import Homepage from './components/homepage'

import './global/scss/styles.scss'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <Homepage />
      </div>
    )
  }
}

export default App
