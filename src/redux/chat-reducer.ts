import { chatAPI } from "../api/chatAPI"
import { InferActionsTypes, BaseThunkType } from './store-redux'

import { ChatMessageType } from "../api/chatAPI"
import { Dispatch } from "redux"

const MESSAGES_RECEIVED = 'SN/chat/MESSAGES_RECEIVED'


type ActionTypes = InferActionsTypes<typeof actionCreators>

const actionCreators = {
  //Обновляем массив сообщений в стейте поступившими messages 
  messagesReceived: (messages: ChatMessageType[]) => {
    return { type: MESSAGES_RECEIVED, payload: messages } as const
  }
}

type ThunkType = BaseThunkType<ActionTypes>

let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null

/* Здесь делаем для подписки-отписки НЕ просто ф-цию типа (messages) => void,  а создаем ф-цию высшего порядка,
чтобы внутрь передать ф-цию dispatch, т.к. при выносе этой ф-ции за пределы Санки замыкание на dispatch пропадает
(dispatch является частью callback-а, которым мы подписываемся)
Теперь при вызове newMessagesHandlerCreator внутри Санки dispatch будет взят из замыкания внутри Санки.
*/

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages) => {
      dispatch(actionCreators.messagesReceived(messages))
    }
  }
  return _newMessagesHandler
}

/* Санка прослушивания ws-канала.
При ее диспатче происходит инициализация ws-канала (запуск канала, если его нет).
И производится подписка на канал - передается через метод chatAPI.subscribe callback в DAL уровень.
При поступлении сообщений messages в DAL вызовется этот callback и через action обновит state.chat.messages
Зачем выше создана ф-ция newMessagesHandlerCreator - для метода .unsubscribe нужна та же самая ф-ция, что и для .subscribe
(происходит отписка под капотом через removeEventListener - для нее нужна та же ф-ция, а ф-ция - это объект, ссылочный тип - 
т.е. ссылка должна быть на одну и ту же ячейку памяти)
*/
export const startMessagesListeningThunk = (): ThunkType => {
  return (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessagesHandlerCreator(dispatch))
  }
}

// Санка отписывания от ws канала с остановкой работы последнего через методы chatAPI
export const stopMessagesListeningThunk = (): ThunkType => {
  return (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe(newMessagesHandlerCreator(dispatch))
  }
}

// Санка отправки сообщения
export const sendMessageThunk = (message: string): ThunkType => {
  return (dispatch) => {
    chatAPI.sendMessage(message)
  }
}

// getState().chat
// Пока храним исключительно массив сообщений чата (100 последних сообщений)

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