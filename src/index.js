import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import registerServiceWorker from './registerServiceWorker'

import './global/scss/styles.scss'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
