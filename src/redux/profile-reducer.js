const ADD_POST = 'ADD-POST'
const UPDATE_POST = 'UPDATE-POST'

export const addPostActionCreator = () => {
  return { type: ADD_POST }
}

export const updatePostActionCreator = (text) => {
  return {
    type: UPDATE_POST,
    text
  }
}


const profileReduser = (state, action) => { // state = state.profile
  switch (action.type) {

    case ADD_POST:
      if (state.newPost !== '') {
        const newPostId = state.profilePosts[state.profilePosts.length - 1].id + 1
        const newPostObj = {
          id: newPostId,
          post: state.newPost,
          likesCount: 0
        }
        state = { ...state, ...state.profilePosts.push(newPostObj) }
        state.newPost = ''
      }
      return state

    case UPDATE_POST:
      state.newPost = action.text
      return state

    default:
      return state

  }

}

export default profileReduser