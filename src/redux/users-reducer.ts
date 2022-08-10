import { usersAPI } from '../api/api'

const FOLLOW_TOGGLE = 'social_network/users/FOLLOW_TOGGLE'
const SET_USERS = 'social_network/users/SET_USERS'
const SET_TOTAL_COUNT = 'social_network/users/SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'social_network/users/SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'social_network/users/TOGGLE_IS_FETCHING'
const IS_FOLLOWING_IN_PROGRESS_TOGGLE = 'social_network/users/IS_FOLLOWING_IN_PROGRESS_TOGGLE'

// AC - action creator

type FollowToggleACType = {
  type: typeof FOLLOW_TOGGLE,
  userId: number
}

export const followToggleAC = (userId: number): FollowToggleACType => {
  return { type: FOLLOW_TOGGLE, userId }
}

type SetUsersACType = {
  type: typeof SET_USERS,
  usersList: UsersListType
}

export const setUsersAC = (usersList: UsersListType): SetUsersACType => {
  return { type: SET_USERS, usersList }
}

type SetTotalCountACType = {
  type: typeof FOLLOW_TOGGLE,
  totalCount: number
}

export const setTotalCountAC = (totalCount: number): SetTotalCountACType => {
  return { type: FOLLOW_TOGGLE, totalCount }
}

type SetCurrentPageACType = {
  type: typeof SET_CURRENT_PAGE,
  currentPage: number
}

export const setCurrentPageAC = (currentPage: number): SetCurrentPageACType => {
  return { type: SET_CURRENT_PAGE, currentPage }
}

type ToggleIsFetchingACType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}

export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingACType => {
  return { type: TOGGLE_IS_FETCHING, isFetching }
}

type IsFollowingToggleACType = {
  type: typeof IS_FOLLOWING_IN_PROGRESS_TOGGLE,
  followingUserId: number
}

export const isFollowingToggleAC = (followingUserId: number): IsFollowingToggleACType => {
  return { type: IS_FOLLOWING_IN_PROGRESS_TOGGLE, followingUserId }
}

// thunk-creators
export const getUsersThunk = (currentPage: number, usersOnPageCount: number) => {
  return (dispatch: any) => {
    dispatch(toggleIsFetchingAC(true))
    usersAPI.getUsers(currentPage, usersOnPageCount).then((data) => {
      dispatch(setUsersAC(data.items))
      dispatch(setTotalCountAC(data.totalCount))
      dispatch(toggleIsFetchingAC(false))
    })
  }
}

type PhotosType = {
  small: string | null,
  large: string | null
}

type UserInfoType = {
    name: string,
    id: number,
    uniqueUrlName: string | null,
    photos: PhotosType,
    status: string | null,
    followed: boolean
}

type UsersListType = Array<UserInfoType>

type InitialStateType = {
  usersList: UsersListType,
  totalCount: number,
  currentPage: number,
  usersOnPageCount: number,
  isFetching: boolean,
  isFollowingInProgress: Array<number>
}

// state = state.users
const initialState: InitialStateType = {
  usersList: [],
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
  totalCount: 0,
  currentPage: 1,
  usersOnPageCount: 5,
  isFetching: false,
  isFollowingInProgress: [] //massiv iz id userov kotorie v processe zaprosa na followed - esli id net, to button ne disable
}

// state = state.users
const usersReduser = (state = initialState, action: any): InitialStateType => { 
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

    case IS_FOLLOWING_IN_PROGRESS_TOGGLE:
      let tempArr = [...state.isFollowingInProgress]
      if (tempArr.indexOf(action.followingUserId) < 0) {
        tempArr = [...tempArr, action.followingUserId]
      }
      else {
        tempArr = tempArr.filter((item) => item !== action.followingUserId)
      }
      return { ...state, isFollowingInProgress: [...tempArr] }

    default:
      return state
  }
}

export default usersReduser