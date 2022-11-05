import {AppStateType} from './store-redux'

export const getDialogsUsers = (state: AppStateType) => state.messages.users
export const getDialogs = (state: AppStateType) => state.messages.dialogs