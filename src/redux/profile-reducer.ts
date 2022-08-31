import { stopSubmit } from 'redux-form'
import { Dispatch } from 'redux'
import { profileAPI } from "../api/profileAPI"
import { PhotosType, ProfileType, Nullable } from '../types/types'
import { AppStateType, InferActionsTypes } from './store-redux'

const ADD_POST = 'social_network/profile/ADD-POST'
const SET_USER_PROFILE = 'social_network/profile/SET_USER_PROFILE'
const SET_USER_STATUS = 'social_network/profile/SET_USER_STATUS'
const SET_MY_STATUS = 'social_network/profile/SET_MY_STATUS'
const UPDATE_MY_STATUS = 'social_network/profile/UPDATE_MY_STATUS'
const UPDATE_MY_PHOTO = 'social_network/profile/UPDATE_MY_PHOTO'

type DispatchType = Dispatch<ActionTypes>
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

type ActionTypes = InferActionsTypes<typeof actionCreators>

export const actionCreators = {
  updateMyPhotoSuccess: (photos: PhotosType) => {
    return {
      type: UPDATE_MY_PHOTO,
      photos
    } as const
  },
  updateMyStatus: (myStatus: string) => {
    return {
      type: UPDATE_MY_STATUS,
      myStatus
    } as const
  },
  setMyStatus: (myStatus: Nullable<string>) => {
    return {
      type: SET_MY_STATUS,
      myStatus
    } as const
  },
  setUserStatus: (status: Nullable<string>) => {
    return {
      type: SET_USER_STATUS,
      status
    } as const
  },
  setUserProfile: (profile: Nullable<ProfileType>) => {
    return {
      type: SET_USER_PROFILE,
      profile
    } as const
  },
  addPost: (postText: string) => {
    return {
      type: ADD_POST,
      postText
    } as const
  }
}

export const savePhotoThunk = (file: any) => {
  return (dispatch: any) => {
    profileAPI.savePhoto(file).then((data) => {
      if (data.resultCode === 0) dispatch(actionCreators.updateMyPhotoSuccess(data.data.photos))
    })
  }
}

export const updateMyStatusThunk = (myStatus: string) => {
  return (dispatch: any) => {
    profileAPI.putMyStatus(myStatus).then((data) => {
      if (data.resultCode === 0) dispatch(actionCreators.updateMyStatus(myStatus))
    })
  }
}

export const setMyStatusThunk = (userId: number) => {
  return (dispatch: any) => {
    profileAPI.getMyStatus(userId).then((status) => dispatch(actionCreators.setMyStatus(status)))
  }
}

export const setUserStatusThunk = (userId: number) => {
  return (dispatch: any) => {
    profileAPI.getUserStatus(userId).then((status) => dispatch(actionCreators.setUserStatus(status)))
  }
}

export const setUserProfileThunk = (userId: number | null) => {
  return (dispatch: any) => {
    profileAPI.getUserProfile(userId).then((data) => dispatch(actionCreators.setUserProfile(data)))
  }
}

type ProfilePostType = {
  id: number,
  post: string,
  likesCount: number
}

// type StateType = {
//   profilePosts: Array<ProfilePostType>
//   userProfile: ProfileType | null
//   userStatus: string | null
//   myStatus: string | null
// }

const initialState = {
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
  ] as Array<ProfilePostType>,
  userProfile: null as Nullable<ProfileType>,
  userStatus: null as Nullable<string>,
  myStatus: null as Nullable<string>
}

// state = state.profile
const profileReduser = (state = initialState, action: ActionTypes): any => {
  switch (action.type) {

    case UPDATE_MY_PHOTO:
      return {
        ...state,
        userProfile: { ...state.userProfile, photos: action.photos }
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