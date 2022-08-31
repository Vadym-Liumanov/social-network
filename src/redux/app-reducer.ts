import { getAuthDataThunk } from './auth-reducer'
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
  return (dispatch) => {
    const promise1 = dispatch(getAuthDataThunk())
    Promise.all([promise1]).then(() => {
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