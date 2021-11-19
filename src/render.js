import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export const rerenderEntireTree = (state, addPost, updatePost, addDialog, updateDialog) => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={state} addPost={addPost} updatePost={updatePost} addDialog={addDialog} updateDialog={updateDialog} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}