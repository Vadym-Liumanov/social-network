import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

import { reducer as formReducer } from 'redux-form'

import thunkMiddleware from 'redux-thunk'

import messagesReducer from './messages-reducer'
import profileReduser from './profile-reducer'
import usersReduser from './users-reducer'
import authReducer from './auth-reducer'
import appReducer from './app-reducer'

const rootReducer = combineReducers({
  messages: messagesReducer,
  profile: profileReduser,
  users: usersReduser,
  auth: authReducer,
  form: formReducer,
  app: appReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// window.store = store

export default store