import { Dispatch } from "redux"
import { v1 } from 'uuid'

import { chatAPI, StatusType, ChatMessageAPIType } from "../api/chatAPI"
import { InferActionsTypes, BaseThunkType } from './store-redux'

const MESSAGES_RECEIVED = 'SN/chat/MESSAGES_RECEIVED'
const MESSAGES_CLEARED = 'SN/chat/MESSAGES_CLEARED'
const STATUS_CHANGED = 'SN/chat/STATUS_CHANGED'

// Т.к. с сервера получаем объект сообщения без поля id, а идеальный id нужен для рендера сообщений,
// то на уровне store вводим свой объект сообщения, дополняемый полем id
export type ChatMessageType = ChatMessageAPIType & { id: string }
type ActionTypes = InferActionsTypes<typeof actionCreators>

const actionCreators = {
  //Обновляем массив сообщений в стейте поступившими messages 
  messagesReceived: (apiMessages: ChatMessageAPIType[]) => {
    // Преобразуем тип получаемых из WS-канала сообщений в тип для store - добавляем уникальный id
    // Оставляем в массиве сообщений 100 последних сообщений - или все сообщения, если их меньше 100
    const messages: ChatMessageType[] = apiMessages
      .map(m => ({ ...m, id: v1() }))
      .filter((m, index, array) => index >= array.length - 100)
    return { type: MESSAGES_RECEIVED, messages } as const
  },
  messagesCleared: () => {
    // Очищаем массив сообщений. Используется при unmounte компоненты ChatPage.
    // При открытии нового WS-соединения будет получен новый массив messages - поэтому дабы избежать дублирования
    // необходимо сбросить предыдущий массив.
    return { type: MESSAGES_CLEARED } as const
  },
  statusChanged: (status: StatusType) => {
    return { type: STATUS_CHANGED, status } as const
  }
}

type ThunkType = BaseThunkType<ActionTypes>

/* Здесь делаем для подписки-отписки НЕ просто ф-цию типа (messages) => void,  а создаем ф-цию высшего порядка,
чтобы внутрь передать ф-цию dispatch, т.к. при выносе этой ф-ции за пределы Санки замыкание на dispatch пропадает
(dispatch является частью callback-а, которым мы подписываемся).
Этой конструкцией производим мемоизацию ф-ций обработки.
Теперь при вызове newMessagesHandlerCreator | statusChangedHandlerCreator внутри Санки dispatch будет взят
из замыкания внутри Санки.
*/
let _newMessagesHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages) => {
      dispatch(actionCreators.messagesReceived(messages))
    }
  }
  return _newMessagesHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actionCreators.statusChanged(status))
    }
  }
  return _statusChangedHandler
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
    chatAPI.subscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
  }
}

// Санка отписывания от ws канала с остановкой работы последнего (ws.close()) через методы chatAPI
export const stopMessagesListeningThunk = (): ThunkType => {
  return (dispatch) => {
    chatAPI.stop()
    chatAPI.unsubscribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    dispatch(actionCreators.messagesCleared())
  }
}

// Санка отправки сообщения
export const sendMessageThunk = (message: string): ThunkType => {
  return (dispatch) => {
    chatAPI.sendMessage(message)
  }
}

// getState().chat
// Храним массив сообщений чата (max 100 последних сообщений)

const initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
}

export type StateType = typeof initialState

const chatReducer = (state = initialState, action: ActionTypes): StateType => {
  switch (action.type) {

    case MESSAGES_RECEIVED:
      return {
        ...state, messages: [...state.messages, ...action.messages]
      }

    case MESSAGES_CLEARED:
      return {
        ...state, messages: [...[]]
      }

    case STATUS_CHANGED:
      return {
        ...state, status: action.status
      }

    default:
      return state
  }
}

export default chatReducer