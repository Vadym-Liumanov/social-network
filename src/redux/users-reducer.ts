import { usersAPI } from "../api/usersAPI"
import { UserInfoType } from '../types/types'
import { InferActionsTypes, BaseThunkType } from './store-redux'

const FOLLOW_TOGGLE = 'social_network/users/FOLLOW_TOGGLE'
const SET_USERS = 'social_network/users/SET_USERS'
const SET_TOTAL_COUNT = 'social_network/users/SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'social_network/users/SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'social_network/users/TOGGLE_IS_FETCHING'
const IS_FOLLOWING_IN_PROGRESS_TOGGLE = 'social_network/users/IS_FOLLOWING_IN_PROGRESS_TOGGLE'
const SET_USERS_FILTER = 'social_network/users/SET_USERS_FILTER'

// AC - action creator

export const actionCreators = {
  setUsersFilterAC: (usersFilter: UsersFilterType = { term: '', friend: null }) => {
    return { type: SET_USERS_FILTER, payload: usersFilter } as const
  },
  followToggleAC: (userId: number | null) => {
    return { type: FOLLOW_TOGGLE, userId } as const
  },
  setUsersAC: (usersList: UsersListType) => {
    return { type: SET_USERS, usersList } as const
  },
  setTotalCountAC: (totalCount: number) => {
    return { type: SET_TOTAL_COUNT, totalCount } as const
  },
  setCurrentPageAC: (currentPage: number) => {
    return { type: SET_CURRENT_PAGE, currentPage } as const
  },
  toggleIsFetchingAC: (isFetching: boolean) => {
    return { type: TOGGLE_IS_FETCHING, isFetching } as const
  },
  isFollowingToggleAC: (followingUserId: number | null) => {
    return { type: IS_FOLLOWING_IN_PROGRESS_TOGGLE, followingUserId } as const
  }
}

type ActionTypes = InferActionsTypes<typeof actionCreators>

// thunk creators

// type GetStateType = () => AppStateType
// type DispatchType = Dispatch<ActionTypes>
// предыдущие 2 типа описывали типы ф-ций (dispatch, getState), пока не был введен тип для санки ThunkType
type ThunkType = BaseThunkType<ActionTypes>

export const getUsersThunk = (currentPage: number, usersOnPageCount: number, usersFilter: UsersFilterType): ThunkType => {
  return (dispatch) => {
    dispatch(actionCreators.toggleIsFetchingAC(true))
    usersAPI.getUsers(currentPage, usersOnPageCount, usersFilter).then((data) => {
      dispatch(actionCreators.setUsersAC(data.items))
      dispatch(actionCreators.setTotalCountAC(data.totalCount))
      dispatch(actionCreators.toggleIsFetchingAC(false))
    })
  }
}

type UsersListType = Array<UserInfoType>

export type UsersFilterType = {
  term: string
  friend: boolean | null
}

type StateType = {
  usersList: UsersListType
  totalCount: number
  currentPage: number
  usersOnPageCount: number
  isFetching: boolean
  /* массив из id юзеров, которые отображены на текущей странице и находятся в процессе операции
  follow/unfollow (асинхронного запроса к серверу). Массив позволяет при рендере страницы юзеров
  поюзерно блокировать кнопку дружбы на время разрешения запроса (проблематика - чтобы можно было 
  фолловить очередного юзера, пока процесс фоллоу для предыдущего в процессе) */
  isFollowingInProgress: Array<number | null>
  usersFilter: UsersFilterType
}

// getState().users
const initialState: StateType = {
  // see usersList format on url='https://social-network.samuraijs.com/api/1.0/users?page=1&count=2'
  usersList: [],
  totalCount: 0,
  currentPage: 1,
  usersOnPageCount: 5,
  isFetching: false,
  //massiv iz id userov kotorie v processe zaprosa na followed - esli id net, to button ne disable
  isFollowingInProgress: [],
  usersFilter: {
    term: '',
    friend: null
  }

}

const usersReduser = (state = initialState, action: ActionTypes): StateType => {
  switch (action.type) {

    case SET_USERS_FILTER:
      return { ...state, usersFilter: { ...action.payload } }

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