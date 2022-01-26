import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// let store = createStore(reducers, applyMiddleware(thunkMiddleware))

// window.store = store

export default store