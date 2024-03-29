import { FormAction, stopSubmit } from 'redux-form'
import { profileAPI } from "../api/profileAPI"
import { PhotosType, ProfileType, Nullable } from '../types/types'
import { InferActionsTypes, BaseThunkType } from './store-redux'

const ADD_POST = 'social_network/profile/ADD-POST'
const SET_USER_PROFILE = 'social_network/profile/SET_USER_PROFILE'
const SET_MY_PROFILE = 'social_network/profile/SET_MY_PROFILE'
const SET_USER_STATUS = 'social_network/profile/SET_USER_STATUS'
const SET_MY_STATUS = 'social_network/profile/SET_MY_STATUS'
const UPDATE_MY_STATUS = 'social_network/profile/UPDATE_MY_STATUS'
const UPDATE_MY_PHOTO = 'social_network/profile/UPDATE_MY_PHOTO'
const SET_IS_FETCHING = 'social_network/profile/SET_IS_FETCHING'

type ThunkType = BaseThunkType<ActionTypes | FormAction>



// Action creators

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
  setMyProfile: (profile: Nullable<ProfileType>) => {
    return {
      type: SET_MY_PROFILE,
      profile
    } as const
  },
  addPost: (postText: string) => {
    return {
      type: ADD_POST,
      postText
    } as const
  },
  setIsFetching: (isFetching: boolean) => {
    return { type: SET_IS_FETCHING, isFetching } as const
  }

}

// Thunk creators

export const updateMyStatusThunk = (myStatus: string): ThunkType => {
  return (dispatch) => {
    profileAPI.putMyStatus(myStatus).then((data) => {
      if (data.resultCode === 0) dispatch(actionCreators.updateMyStatus(myStatus))
    })
  }
}

export const setMyStatusThunk = (userId: number): ThunkType => {
  return (dispatch) => {
    profileAPI.getMyStatus(userId).then((status) => dispatch(actionCreators.setMyStatus(status)))
  }
}

export const setUserStatusThunk = (userId: number): ThunkType => {
  return (dispatch) => {
    profileAPI.getUserStatus(userId).then((status) => dispatch(actionCreators.setUserStatus(status)))
  }
}

export const setUserProfileThunk = (userId: number | null): ThunkType => {
  return (dispatch, getState) => {
    const myId = getState().auth.id
    const isOwner = (userId === myId)
    dispatch(actionCreators.setIsFetching(true))
    profileAPI.getUserProfile(userId).then((data) => {
      if (isOwner) {
        dispatch(actionCreators.setMyProfile(data))
      } else {
        dispatch(actionCreators.setUserProfile(data))
      }
      dispatch(actionCreators.setIsFetching(false))
    })
  }
}

// Санка апдейтит myProfile, но в стейте апдейтится userProfile !!!!!!!
// НАДА: получаем из формы измененный профиль formData, отправляем через АПИ на сервер,
// получаем ответ с сервера об успешной записи изменений, считываем через АПИ профайл-дату
// и записываем в стейт

export const updateProfileThunk = (profileData: ProfileType): ThunkType => {
  return (dispatch, getState) => {
    const userId = getState().auth.id
    dispatch(actionCreators.setIsFetching(true))
    return profileAPI.updateProfile(profileData).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserProfileThunk(userId))
      }
      else {
        dispatch(actionCreators.setIsFetching(false))
        dispatch(stopSubmit('profile', { _error: data.messages }))
        return Promise.reject(data.messages)
      }
    })
  }
}

export const savePhotoThunk = (file: File): ThunkType => {
  return (dispatch) => {
    profileAPI.savePhoto(file).then((data) => {
      if (data.resultCode === 0) {
        dispatch(actionCreators.updateMyPhotoSuccess(data.data.photos))
      }
    })
  }
}

export const updatePhotoThunk = () => {

}

export type ProfilePostType = {
  id: number
  post: string
  likesCount: number
}

// state = state.profile

/*
Описание ветки state.profile:
  profilePosts - моковые значения постов юзера (или владельца). Их нет в АПИ
  userProfile - объект данных о пользователе (владельце). Меняется при каждой смене id.
    Todo: сделать ветку myProfile - чисто с данными владельца. Будет удобно из любого места достучаться к данным владельца,
    не делая доп. запросов на сервер. Разделим профайлы юзеров и владельца.
  userStatus - статус юзера.
  myStatus - статус владельца. Просто так реализован АПИ.
  isFetching - флаг загрузки данных с сервера.
*/

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
  myProfile: null as Nullable<ProfileType>,
  myStatus: null as Nullable<string>,
  isFetching: false
}

type StateType = typeof initialState

const profileReduser = (state: StateType = initialState, action: ActionTypes): any => {
  switch (action.type) {

    case UPDATE_MY_PHOTO:
      return {
        ...state,
        myProfile: { ...state.myProfile, photos: {...action.photos} }
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

    case SET_MY_PROFILE:

      return {
        ...state,
        myProfile: action.profile
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

    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }

    default:
      return state
  }
}

export default profileReduser