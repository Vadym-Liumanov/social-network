import { getAuthDataThunk } from './auth-reducer'

const SET_APP_INITIALIZED = 'social_network/app/SET_APP_INITIALIZED'

const appInitSuccessAC = () => {
  return { type: SET_APP_INITIALIZED }
}

export const initializeAppThunk = () => {
  return (dispatch) => {
    const promise = dispatch(getAuthDataThunk())
    Promise.all([promise]).then(() => {
      dispatch(appInitSuccessAC())
    })
  }
}

// state = state.app
const initialState = {
  isAppInitialized: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_APP_INITIALIZED:
      return {
        ...state,
        isAppInitialized: true
      }

    default:
      return state
  }
}

export default appReducer