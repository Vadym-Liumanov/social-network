import {AppStateType} from './store-redux'

export const getUsers = (state: AppStateType) => state.users.usersList
export const getTotalCount = (state: AppStateType) => state.users.totalCount
export const getUsersOnPageCount = (state: AppStateType) => state.users.usersOnPageCount
export const getCurrentPage = (state: AppStateType) => state.users.currentPage
export const getIsFetching = (state: AppStateType) => state.users.isFetching
export const getIsFollowingInProgress = (state: AppStateType) => state.users.isFollowingInProgress
export const getUsersFilter = (state: AppStateType) => state.users.usersFilter
