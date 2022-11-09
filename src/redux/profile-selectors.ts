import {AppStateType} from './store-redux'

export const getProfileInfo = (state: AppStateType) => state.profile.userProfile
export const getUserStatus = (state: AppStateType) => state.profile.userStatus
export const getMyStatus = (state: AppStateType) => state.profile.myStatus
export const getProfilePosts = (state: AppStateType) => state.profile.profilePosts