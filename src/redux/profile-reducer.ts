import { stopSubmit } from 'redux-form'
import { profileAPI } from '../api/api'
import { PhotosType, ProfileType } from '../types/types'
import { AppStateType } from './store-redux'

const ADD_POST = 'social_network/profile/ADD-POST'
const SET_USER_PROFILE = 'social_network/profile/SET_USER_PROFILE'
const SET_USER_STATUS = 'social_network/profile/SET_USER_STATUS'
const SET_MY_STATUS = 'social_network/profile/SET_MY_STATUS'
const UPDATE_MY_STATUS = 'social_network/profile/UPDATE_MY_STATUS'
const UPDATE_MY_PHOTO = 'social_network/profile/UPDATE_MY_PHOTO'

type GetStateType = () => AppStateType

export const updateProfileThunk = (profileData: ProfileType) => {
  return (dispatch: any, getState: GetStateType) => {
    const userId = getState().auth.id
    return profileAPI.updateProfile(profileData).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserProfileThunk(userId))
      }
      else {
        dispatch(stopSubmit('profile', { _error: data.messages }))
        return Promise.reject(data.messages)
      }
    })
  }
}

type UpdateMyPhotoSuccessACType = {
  type: typeof UPDATE_MY_PHOTO,
  photos: PhotosType
}

const updateMyPhotoSuccessAC = (photos: PhotosType): UpdateMyPhotoSuccessACType => {
  return {
    type: UPDATE_MY_PHOTO,
    photos
  }
}

export const savePhotoThunk = (file: any) => {
  return (dispatch: any) => {
    profileAPI.savePhoto(file).then((data) => {
      if (data.resultCode === 0) dispatch(updateMyPhotoSuccessAC(data.data.photos))
    })
  }
}

type UpdateMyStatusACType = {
  type: typeof UPDATE_MY_STATUS,
  myStatus: string
}

const updateMyStatusAC = (myStatus: string): UpdateMyStatusACType => {
  return {
    type: UPDATE_MY_STATUS,
    myStatus
  }
}

export const updateMyStatusThunk = (myStatus: string) => {
  return (dispatch: any) => {
    profileAPI.putMyStatus(myStatus).then((data) => {
      if (data.resultCode === 0) dispatch(updateMyStatusAC(myStatus))
    })
  }
}

type SetMyStatusACType = {
  type: typeof SET_MY_STATUS,
  myStatus: string
}

const setMyStatusAC = (myStatus: string): SetMyStatusACType => {
  return {
    type: SET_MY_STATUS,
    myStatus
  }
}

export const setMyStatusThunk = (userId: number) => {
  return (dispatch: any) => {
    profileAPI.getMyStatus(userId).then((status) => dispatch(setMyStatusAC(status)))
  }
}

type SetUserStatusACType = {
  type: typeof SET_USER_STATUS,
  status: string
}

const setUserStatusAC = (status: string): SetUserStatusACType => {
  return {
    type: SET_USER_STATUS,
    status: status
  }
}

export const setUserStatusThunk = (userId: number) => {
  return (dispatch: any) => {
    profileAPI.getUserStatus(userId).then((status) => dispatch(setUserStatusAC(status)))
  }
}

type SetUserProfileACType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}

export const setUserProfileAC = (profile: ProfileType): SetUserProfileACType => {
  return {
    type: SET_USER_PROFILE,
    profile
  }
}

export const setUserProfileThunk = (userId: number | null) => {
  return (dispatch: any) => {
    profileAPI.getUserProfile(userId).then((data) => dispatch(setUserProfileAC(data)))
  }
}

type AddPostACType = {
  type: typeof ADD_POST,
  postText: string
}

export const addPostAC = (postText: string): AddPostACType => {
  return { type: ADD_POST, postText }
}

type ProfilePostsType = {
  id: number,
  post: string,
  likesCount: number
}

type InitialStateType = {
  profilePosts: Array<ProfilePostsType>
  userProfile: ProfileType | null
  userStatus: string | null
  myStatus: string | null
}

const initialState: InitialStateType = {
  profilePosts: [
    {
      id: 1,
      post: 'It is my first post!',
      likesCount: 20
    },
    {
      id: 2,
      post: 'How are you?',
      likesCount: 10
    }
  ],
  userProfile: null,
  userStatus: null,
  myStatus: null
}

type ActionCreatorTypes = UpdateMyPhotoSuccessACType | UpdateMyStatusACType | SetMyStatusACType
  | SetUserStatusACType | SetUserProfileACType | AddPostACType

// state = state.profile
const profileReduser = (state = initialState, action: ActionCreatorTypes) => {
  switch (action.type) {

    case UPDATE_MY_PHOTO:
      /*
        "photos": {
          "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
          "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
        }  
      */
      return {
        ...state, userProfile: { ...state.userProfile, photos: action.photos }
      }

    case ADD_POST:
      const newPostId = state.profilePosts[state.profilePosts.length - 1].id + 1
      const newPostObj = {
        id: newPostId,
        post: action.postText,
        likesCount: 0
      }

      return {
        ...state,
        profilePosts: [...state.profilePosts, newPostObj],
      }

    /* 
      case UPDATE_POST:
        return {
          ..state,
          newPost: action.text
        }
    */

    case SET_USER_PROFILE:
      // https://social-network.samuraijs.com/api/1.0/profile/2

      return {
        ...state,
        userProfile: action.profile
      }

    case SET_USER_STATUS:
      return {
        ...state,
        userStatus: action.status
      }

    case SET_MY_STATUS:
      return {
        ...state,
        myStatus: action.myStatus
      }

    case UPDATE_MY_STATUS:
      return {
        ...state,
        myStatus: action.myStatus
      }

    default:
      return state
  }
}

export default profileReduser