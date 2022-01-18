import { stopSubmit } from 'redux-form'
import { getAuthData, loginOnTheService, logoutFromTheService } from '../api/api'

const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA'
const RESET_USER_AUTH_DATA = 'RESET_USER_AUTH_DATA'

export const setUserAuthDataAC = (authData) => {
  return { type: SET_USER_AUTH_DATA, authData }
}

export const getAuthDataThunk = () => {
  return (dispatch) => {
    getAuthData().then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserAuthDataAC(data.data))
      }
    })
  }
}

export const loginThunk = (email, password, rememberMe) => {
  return (dispatch) => {
    loginOnTheService(email, password, rememberMe).then((data) => {
      if (data.resultCode === 0) {
        dispatch(getAuthDataThunk())
      }
      else {
        let ErrorMessage = data.messages.length > 0 ? data.messages[0] : 'Somthing wrong'
        let action = stopSubmit('login', { _error: ErrorMessage })
        dispatch(action)
      }
    })
  }
}

export const resetAuthDataAC = () => {
  return { type: RESET_USER_AUTH_DATA }
}

export const logoutThunk = () => {
  return (dispatch) => {
    logoutFromTheService().then((data) => {
      if (data.resultCode === 0) {
        dispatch(resetAuthDataAC())
      }
    })
  }
}


// state = state.auth
const initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_USER_AUTH_DATA:
      return {
        ...state,
        id: action.authData.id,
        login: action.authData.login,
        email: action.authData.email,
        isAuth: true
      }

    case RESET_USER_AUTH_DATA:
      return {
        ...state,
        ...initialState
      }

    default:
      return state
  }
}

export default authReducer