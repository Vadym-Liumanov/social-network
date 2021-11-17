import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const data = {
  profilePosts: [
    {
      id: 1,
      post: 'It is my first post!',
      likesCount: 20
    },
    {
      id: 2,
      post: 'How are you?',
      likesCount: 10
    },
    {
      id: 3,
      post: 'Hello World',
      likesCount: 5
    },
    {
      id: 4,
      post: 'Why nobody loves me',
      likesCount: 12
    }
  ],
  messages: {
    users: [
      {
        id: 1,
        userName: 'Dima'
      },
      {
        id: 2,
        userName: 'Helen'
      },
      {
        id: 3,
        userName: 'Vovan'
      },
      {
        id: 4,
        userName: 'Alex'
      }
    ],
    dialogs: [
      {
        id: 1,
        dialog: 'How are you?'
      },
      {
        id: 2,
        dialog: 'I am fine.'
      },
      {
        id: 3,
        dialog: 'What are you doing'
      },
      {
        id: 4,
        dialog: 'Let\'s go to the stadium.'
      }
    ]
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App {...data} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
