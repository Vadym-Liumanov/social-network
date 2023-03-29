import { getAuthDataThunk } from './auth-reducer'
import { setUserProfileThunk } from './profile-reducer'
import { InferActionsTypes, BaseThunkType } from './store-redux'

const SET_APP_INITIALIZED = 'social_network/app/SET_APP_INITIALIZED'

type ActionTypes = InferActionsTypes<typeof actionCreators>

const actionCreators = {
  appInitSuccess: () => {
    return { type: SET_APP_INITIALIZED } as const
  }
}

type ThunkType = BaseThunkType<ActionTypes>

export const initializeAppThunk = (): ThunkType => {
  return (dispatch, getState) => {
    const promise1 = dispatch(getAuthDataThunk()).then(() => {
      // Добавляем фичу, чтобы при реиницилизации приложения запрашивался не только статус авторизации, но и если юзер 
      // авторизован, запрашивалась информация по профилю владельца акка - нужно для того, чтобы при обновлении окна
      // и переинициализации приложения из стора не пропадали данные профайла owner-а: к примеру пропадет его автврка, 
      // если refresh произойдет на странице, отличной от profilePage.
      const myId = getState()?.auth.id
      if (myId) {
        dispatch(setUserProfileThunk(myId))
      }
    })
    Promise.all([promise1])
      .then(() => {
        dispatch(actionCreators.appInitSuccess())
      })
  }
}

// getState().app
const initialState = {
  isAppInitialized: false
}

type StateType = typeof initialState

const appReducer = (state = initialState, action: ActionTypes): StateType => {
  switch (action.type) {

    case SET_APP_INITIALIZED:
      return {
        ...state,
        isAppInitialized: true,
      }

    default:
      return state
  }
}

export default appReducer