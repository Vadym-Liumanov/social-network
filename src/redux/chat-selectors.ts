import {AppStateType} from './store-redux'

export const getMessages = (state: AppStateType) => state.chat.messages