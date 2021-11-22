import React from 'react'
import ReactDOM from 'react-dom'

import store from './redux/state'
import './index.css'
import App from './App'

let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        state={state}
        addPost={store.addPost.bind(store)}
        updatePost={store.updatePost.bind(store)}
        addDialog={store.addDialog.bind(store)}
        updateDialog={store.updateDialog.bind(store)}
      />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

rerenderEntireTree(store.getState())

store.subscribe(rerenderEntireTree)