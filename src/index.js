import React from 'react'
import ReactDOM from 'react-dom'

import state from './redux/state'
import { addPost, updatePost, addDialog, updateDialog, subscribe } from './redux/state'

import './index.css'
import App from './App'

let rerenderEntireTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={state} addPost={addPost} updatePost={updatePost} addDialog={addDialog} updateDialog={updateDialog} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

rerenderEntireTree(state, addPost, updatePost, addDialog, updateDialog)

subscribe(rerenderEntireTree)