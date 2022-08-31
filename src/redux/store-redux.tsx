import { combineReducers, createStore, applyMiddleware, compose, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
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

// type InferActionsTypes<T> определяет тип actions, которые подаются на вход редьюсеров
// где T = typeof actionCreators
// actionCreators = {AC1: (...args) => any, AC2: (...args) => any} - сборный объект всех actionCreators редьюсора
// Таким образом мы просто добавляем AC в объект actionCreators, а union-тип экшенов сам обновляется
type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>

// export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type BaseThunkType<A extends Action = Action, R = any> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// window.store = store

export default store