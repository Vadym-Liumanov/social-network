import React from 'react'
import ReactDOM from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
// import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store-redux'
import './index.css'
import App from './App'

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
)