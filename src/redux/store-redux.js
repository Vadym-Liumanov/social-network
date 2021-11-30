import { combineReducers, createStore } from "redux"

import messagesReducer from './messages-reducer'
import profileReduser from './profile-reducer'

const reducers = combineReducers({
  messages: messagesReducer,
  profile: profileReduser
})

let store = createStore(reducers)

// window.store = store

export default store