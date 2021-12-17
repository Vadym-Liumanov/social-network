import { combineReducers, createStore } from "redux"

import messagesReducer from './messages-reducer'
import profileReduser from './profile-reducer'
import usersReduser from './users-reducer'
import authReducer from './auth-reducer'

const reducers = combineReducers({
  messages: messagesReducer,
  profile: profileReduser,
  users: usersReduser,
  auth: authReducer
})

let store = createStore(reducers)

window.store = store

export default store