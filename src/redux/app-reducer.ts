import { getAuthDataThunk } from './auth-reducer'
import { AppStateType } from './store-redux'

const SET_APP_INITIALIZED = 'social_network/app/SET_APP_INITIALIZED'

type AppInitSuccessACType = {
  type: typeof SET_APP_INITIALIZED
}

const appInitSuccessAC = (): AppInitSuccessACType => {
  return { type: SET_APP_INITIALIZED }
}

type ActionTypes = AppInitSuccessACType

export const initializeAppThunk = () => {
  return (dispatch: any, getState: () => AppStateType) => {
    const promise1 = dispatch(getAuthDataThunk())
    Promise.all([promise1]).then(() => {
      dispatch(appInitSuccessAC())
    })
  }
}

type InitialStateType = {
  isAppInitialized: boolean
}

// state = state.app
const initialState: InitialStateType = {
  isAppInitialized: false
}

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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