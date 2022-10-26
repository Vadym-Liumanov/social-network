import {AppStateType} from './store-redux'

export const getUsers = (state: AppStateType) => state.users.usersList
