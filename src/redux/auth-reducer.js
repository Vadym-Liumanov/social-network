const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA'

export const setUserAuthDataAC = (authData) => {
  return { type: SET_USER_AUTH_DATA, authData }
}

const initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false
}

const authReducer = (state = initialState, action) => { // state = state.authData
  switch (action.type) {

    case SET_USER_AUTH_DATA:
      return {
        ...state,
        id: action.authData.id,
        login: action.authData.login,
        email: action.authData.email,
        isAuth: true
      }

    default:
      return state
  }
}

export default authReducer