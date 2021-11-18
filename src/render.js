import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export const rerenderEntireTree = (state, addPost, updatePost) => {
  ReactDOM.render(
    <React.StrictMode>
      <App state={state} addPost={addPost} updatePost={updatePost} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}