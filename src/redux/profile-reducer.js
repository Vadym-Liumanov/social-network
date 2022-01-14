import { getUserProfile, getUserStatus, getMyStatus, putMyStatus } from '../api/api'

const ADD_POST = 'ADD-POST'
// const UPDATE_POST = 'UPDATE-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'
const SET_MY_STATUS = 'SET_MY_STATUS'
const UPDATE_MY_STATUS = 'UPDATE_MY_STATUS'

export const updateMyStatusAC = (myStatus) => {
  return {
    type: UPDATE_MY_STATUS,
    myStatus
  }
}

export const updateMyStatusThunk = (myStatus) => {
  return (dispatch) => {
    putMyStatus(myStatus).then((data) => {
      if (data.resultCode === 0) dispatch(updateMyStatusAC(myStatus))
    })
  }
}

export const setMyStatusAC = (myStatus) => {
  return {
    type: SET_MY_STATUS,
    myStatus
  }
}

export const setMyStatusThunk = (userId) => {
  return (dispatch) => {
    getMyStatus(userId).then((status) => dispatch(setMyStatusAC(status)))
  }
}

export const setUserStatusAC = (status) => {
  return {
    type: SET_USER_STATUS,
    status: status
  }
}

export const setUserStatusThunk = (userId) => {
  return (dispatch) => {
    getUserStatus(userId).then((status) => dispatch(setUserStatusAC(status)))
  }
}

export const addPostAC = (postText) => {
  return { type: ADD_POST, postText }
}

// export const updatePostAC = (text) => {
//   return {
//     type: UPDATE_POST,
//     text: text
//   }
// }

export const setUserProfileAC = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile
  }
}

export const setUserProfileThunk = (userId) => {
  return (dispatch) => {
    getUserProfile(userId).then((data) => dispatch(setUserProfileAC(data)))
  }
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