const FOLLOW_TOGGLE = 'FOLLOW_TOGGLE'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

// AC - action creator
export const followToggleAC = (userId) => {
  return { type: FOLLOW_TOGGLE, userId }
}

export const setUsersAC = (usersList) => {
  return { type: SET_USERS, usersList }
}

export const setTotalCountAC = (totalCount) => {
  return { type: SET_TOTAL_COUNT, totalCount }
}

export const setCurrentPageAC = (currentPage) => {
  return { type: SET_CURRENT_PAGE, currentPage }
}

export const toggleIsFetchingAC = (isFetching) => {
  return { type: TOGGLE_IS_FETCHING, isFetching }
}



// state = state.users
const initialState = {
  usersList: [
    // api format from url='https://social-network.samuraijs.com/api/1.0/users?page=1&count=2'

    // {
    //   "name": "bruklin",
    //   "id": 21402,
    //   "uniqueUrlName": null,
    //   "photos": {
    //     "small": null,
    //     "large": null
    //   },
    //   "status": null,
    //   "followed": true
    // },
    // {
    //   "name": "sershor",
    //   "id": 21401,
    //   "uniqueUrlName": null,
    //   "photos": {
    //     "small": null,
    //     "large": null
    //   },
    //   "status": null,
    //   "followed": false
    // }
  ],
  totalCount: 0,
  currentPage: 1,
  usersOnPageCount: 5,
  isFetching: false
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
      return { ...state, usersList: [...action.usersList] }

    case SET_TOTAL_COUNT:
      return { ...state, totalCount: action.totalCount }

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }

    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }

    default:
      return state
  }
}

export default usersReduser