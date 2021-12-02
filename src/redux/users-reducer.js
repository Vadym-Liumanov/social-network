const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE'
const SET_USERS = 'SET_USERS'

// AC - action creator
export const followToggleAC = (userId) => {
  return { type: FOLLOW_TOGGLE, userId }
}

export const setUsersAC = (usersList) => {
  return { type: SET_USERS, usersList }
}

// state = state.users
const initialState = {
  usersList: [
    // {
    //   id: 1,
    //   avatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
    //   followed: true,
    //   fullName: 'Vadym',
    //   status: 'Don\'t worry! Be happy!',
    //   location: { city: 'Sever', country: 'Ukraine' }
    // },
    // {
    //   id: 2,
    //   avatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
    //   followed: false,
    //   fullName: 'Alex',
    //   status: 'I love life!',
    //   location: { city: 'London', country: 'UK' }
    // },
    // {
    //   id: 3,
    //   avatar: 'https://i.pinimg.com/736x/f5/27/41/f52741fb62bf1d821948a49204406bdc.jpg',
    //   followed: true,
    //   fullName: 'Ann',
    //   status: 'Relax!',
    //   location: { city: 'Moscow', country: 'Russia' }
    // }
  ]

}

const usersReduser = (state = initialState, action) => { // state = state.users
  switch (action.type) {
    case FOLLOW_TOGGLE:
      return {
        ...state,
        usersList: state.usersList.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: (!user.followed) }
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