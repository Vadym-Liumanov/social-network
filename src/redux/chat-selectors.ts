import {AppStateType} from './store-redux'

export const getMessages = (state: AppStateType) => state.chat.messages
export const getChannelStatus = (state: AppStateType) => state.chat.status