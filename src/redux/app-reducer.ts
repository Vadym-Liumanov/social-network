import { getAuthDataThunk } from './auth-reducer'

const SET_APP_INITIALIZED = 'social_network/app/SET_APP_INITIALIZED'

type AppInitSuccessACType = {
  type: typeof SET_APP_INITIALIZED
}

const appInitSuccessAC = (): AppInitSuccessACType => {
  return { type: SET_APP_INITIALIZED }
}

export const initializeAppThunk: () => any = () => {
  return (dispatch: any) => {
    const promise = dispatch(getAuthDataThunk())
    Promise.all([promise]).then(() => {
      dispatch(appInitSuccessAC())
    })
  }
}

export type InitialStateType = {
  isAppInitialized: boolean
}

// state = state.app
const initialState: InitialStateType = {
  isAppInitialized: false
}

const appReducer = (state = initialState, action: AppInitSuccessACType): InitialStateType => {
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