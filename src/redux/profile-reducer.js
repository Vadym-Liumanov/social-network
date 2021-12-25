import { getUserProfile } from '../api/api'

const ADD_POST = 'ADD-POST'
const UPDATE_POST = 'UPDATE-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'

export const addPostAC = () => {
  return { type: ADD_POST }
}

export const updatePostAC = (text) => {
  return {
    type: UPDATE_POST,
    text: text
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
  newPost: '',
  userProfile: null
}

// state = state.profile
const profileReduser = (state = initialState, action) => {
  switch (action.type) {

    case ADD_POST:
      if (state.newPost !== '') {
        const newPostId = state.profilePosts[state.profilePosts.length - 1].id + 1
        const newPostObj = {
          id: newPostId,
          post: state.newPost,
          likesCount: 0
        }

        return {
          ...state,
          profilePosts: [...state.profilePosts, newPostObj],
          newPost: ''
        }
      }
      return state

    case UPDATE_POST:
      return {
        ...state,
        newPost: action.text
      }

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



    default:
      return state
  }
}

export default profileReduser