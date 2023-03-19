import {AppStateType} from './store-redux'

export const getUserProfileInfo = (state: AppStateType) => state.profile.userProfile
export const getMyProfileInfo = (state: AppStateType) => state.profile.myProfile
export const getUserStatus = (state: AppStateType) => state.profile.userStatus
export const getMyStatus = (state: AppStateType) => state.profile.myStatus
export const getProfilePosts = (state: AppStateType) => state.profile.profilePosts
export const getIsFetching = (state: AppStateType) => state.profile.isFetching