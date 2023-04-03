import { chatAPI } from "../api/chatAPI"
import { InferActionsTypes, BaseThunkType } from './store-redux'

import { ChatMessageType } from "../api/chatAPI"
import { Dispatch } from "redux"

const MESSAGES_RECEIVED = 'SN/chat/MESSAGES_RECEIVED'


type ActionTypes = InferActionsTypes<typeof actionCreators>

const actionCreators = {
  messagesReceived: (messages: ChatMessageType[]) => {
    return { type: MESSAGES_RECEIVED, payload: messages } as const
  }
}

type ThunkType = BaseThunkType<ActionTypes>

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages) => {
      dispatch(actionCreators.messagesReceived(messages))
    }
  }
  return _newMessagesHandler
}

export const startMessagesListeningThunk = (): ThunkType => {
  return (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessagesHandlerCreator(dispatch))
  }
}

export const stopMessagesListeningThunk = (): ThunkType => {
  return (dispatch) => {
    chatAPI.unsubscribe(newMessagesHandlerCreator(dispatch))
    chatAPI.stop()
  }
}

export const sendMessageThunk = (message: string): ThunkType => {
  return (dispatch) => {
    chatAPI.sendMessage(message)
  }
}

// getState().auth

const initialState = {
  messages: [] as ChatMessageType[]
}

export type StateType = typeof initialState

const chatReducer = (state = initialState, action: ActionTypes): StateType => {
  switch (action.type) {

    case MESSAGES_RECEIVED:
      return {
        ...state, messages: [...state.messages, ...action.payload]
      }

    default:
      return state
  }
}

export default chatReducer