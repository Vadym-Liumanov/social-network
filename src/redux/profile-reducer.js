import { stopSubmit } from 'redux-form'
import { profileAPI } from '../api/api'

const ADD_POST = 'social_network/profile/ADD-POST'
const SET_USER_PROFILE = 'social_network/profile/SET_USER_PROFILE'
const SET_USER_STATUS = 'social_network/profile/SET_USER_STATUS'
const SET_MY_STATUS = 'social_network/profile/SET_MY_STATUS'
const UPDATE_MY_STATUS = 'social_network/profile/UPDATE_MY_STATUS'
const UPDATE_MY_PHOTO = 'social_network/profile/UPDATE_MY_PHOTO'

export const updateProfileThunk = (profileData) => {
  return (dispatch, getState) => {
    const userId = getState().auth.id
    profileAPI.updateProfile(profileData).then((data) => {
      if (data.resultCode === 0) {
        dispatch(setUserProfileThunk(userId))
      }
      else {
        dispatch(stopSubmit('profile', {_error: data.messages}))
      }
    })
  }
}

const updateMyPhotoSuccessAC = (photos) => {
  return {
    type: UPDATE_MY_PHOTO,
    photos
  }
}

export const savePhotoThunk = (file) => {
  return (dispatch) => {
    profileAPI.savePhoto(file).then((data) => {
      if (data.resultCode === 0) dispatch(updateMyPhotoSuccessAC(data.data.photos))
    })
  }
}

const updateMyStatusAC = (myStatus) => {
  return {
    type: UPDATE_MY_STATUS,
    myStatus
  }
}

export const updateMyStatusThunk = (myStatus) => {
  return (dispatch) => {
    profileAPI.putMyStatus(myStatus).then((data) => {
      if (data.resultCode === 0) dispatch(updateMyStatusAC(myStatus))
    })
  }
}

const setMyStatusAC = (myStatus) => {
  return {
    type: SET_MY_STATUS,
    myStatus
  }
}

export const setMyStatusThunk = (userId) => {
  return (dispatch) => {
    profileAPI.getMyStatus(userId).then((status) => dispatch(setMyStatusAC(status)))
  }
}

const setUserStatusAC = (status) => {
  return {
    type: SET_USER_STATUS,
    status: status
  }
}

export const setUserStatusThunk = (userId) => {
  return (dispatch) => {
    profileAPI.getUserStatus(userId).then((status) => dispatch(setUserStatusAC(status)))
  }
}

export const setUserProfileAC = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile
  }
}

export const setUserProfileThunk = (userId) => {
  return (dispatch) => {
    profileAPI.getUserProfile(userId).then((data) => dispatch(setUserProfileAC(data)))
  }
}

export const addPostAC = (postText) => {
  return { type: ADD_POST, postText }
}

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
  ],
  userProfile: null,
  userStatus: null,
  myStatus: null
}

// state = state.profile
const profileReduser = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_MY_PHOTO:
      //   "photos": {
      //     "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
      //     "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
      //   }  

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

    // case UPDATE_POST:
    //   return {
    //     ...state,
    //     newPost: action.text
    //   }

    case SET_USER_PROFILE:
      // https://social-network.samuraijs.com/api/1.0/profile/2

      // const userProfile = {
      //   "aboutMe": "я круто чувак 1001%",
      //   "contacts": {
      //     "facebook": "facebook.com",
      //     "website": null,
      //     "vk": "vk.com/dimych",
      //     "twitter": "https://twitter.com/@sdf",
      //     "instagram": "instagra.com/sds",
      //     "youtube": null,
      //     "github": "github.com",
      //     "mainLink": null
      //   },
      //   "lookingForAJob": true,
      //   "lookingForAJobDescription": "не ищу, а дурачусь",
      //   "fullName": "samurai dimych",
      //   "userId": 2,
      //   "photos": {
      //     "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
      //     "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
      //   }
      // }

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