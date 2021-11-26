import React from 'react'
import ReactDOM from 'react-dom'

import store from './redux/store-redux'
import './index.css'
import App from './App'

import { Provider } from './StoreContext'

let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

rerenderEntireTree(store.getState())

store.subscribe(
  () => {
    let state = store.getState()
    rerenderEntireTree(state)
  }
)