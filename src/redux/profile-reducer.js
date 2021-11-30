const ADD_POST = 'ADD-POST'
const UPDATE_POST = 'UPDATE-POST'

export const addPostActionCreator = () => {
  return { type: ADD_POST }
}

export const updatePostActionCreator = (text) => {
  return {
    type: UPDATE_POST,
    text: text
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
  newPost: ''
}

const profileReduser = (state = initialState, action) => { // state = state.profile
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

    default:
      return state
  }
}

export default profileReduser