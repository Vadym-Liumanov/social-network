import { combineReducers, createStore, applyMiddleware } from 'redux'

import { reducer as formReducer } from 'redux-form'

import thunkMiddleware from 'redux-thunk'

import messagesReducer from './messages-reducer'
import profileReduser from './profile-reducer'
import usersReduser from './users-reducer'
import authReducer from './auth-reducer'
import appReducer from './app-reducer'

const reducers = combineReducers({
  messages: messagesReducer,
  profile: profileReduser,
  users: usersReduser,
  auth: authReducer,
  form: formReducer,
  app: appReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store