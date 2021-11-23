import React from 'react'
import ReactDOM from 'react-dom'

import store from './redux/store-redux'
import './index.css'
import App from './App'

let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={state} dispatch={store.dispatch.bind(store)} />
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