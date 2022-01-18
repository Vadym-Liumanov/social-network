import { getAuthDataThunk } from './auth-reducer'

const SET_APP_INITIALIZED = 'SET_APP_INITIALIZED'

export const setAppInitSuccessAC = () => {
  return { type: SET_APP_INITIALIZED }
}

export const initializeAppThunk = () => {
  return (dispatch) => {
    Promise.all([dispatch(getAuthDataThunk())]).then(() => {
      dispatch(setAppInitSuccessAC())
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