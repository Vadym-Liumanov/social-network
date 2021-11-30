const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'

// AC - action creator
export const followAC = () => {
  return { type: FOLLOW, userId }
}
export const unFollowAC = () => {
  return { type: UNFOLLOW, userId }
}
export const setUsersAC = () => {
  return { type: SET_USERS, usersList }
}


const initialState = {
  usersList: [
    {
      id: 1,
      followed: true,
      fullName: 'Vadym',
      status: 'Don\'t worry! Be happy!',
      location: { city: 'Sever', country: 'Ukraine' }
    },
    {
      id: 2,
      followed: false,
      fullName: 'Alex',
      status: 'I love life!',
      location: { city: 'London', country: 'UK' }
    },
    {
      id: 3,
      followed: true,
      fullName: 'Ann',
      status: 'Relax!',
      location: { city: 'Moscow', country: 'Russia' }
    }
  ],

}

const usersReduser = (state = initialState, action) => { // state = state.users
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersList: state.usersList.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: true }
          }
          return user
        })
      }

    case UNFOLLOW:
      return {
        ...state,
        usersList: state.usersList.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: false }
          }
          return user
        })
      }

    case SET_USERS:
      return { ...state, usersList: [...state.usersList, ...action.usersList] }

    default:
      return state
  }
}

export default usersReduser