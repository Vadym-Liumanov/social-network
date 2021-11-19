import {rerenderEntireTree} from '../render'

let state = {
  profile: {
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
      },
    ],
    newPost: ''
  },
  messages: {
    users: [
      {
        id: 1,
        userName: 'Dima'
      },
      {
        id: 2,
        userName: 'Helen'
      },
      {
        id: 3,
        userName: 'Vovan'
      },
    ],
    dialogs: [
      {
        id: 1,
        dialog: 'How are you?'
      },
      {
        id: 2,
        dialog: 'I am fine.'
      },
      {
        id: 3,
        dialog: 'What are you doing'
      },
      {
        id: 4,
        dialog: 'Let\'s go to the stadium.'
      }
    ]
  }
}

// window.state = state

export const addPost = () => {
  if (state.profile.newPost !== '') {
    let newPostId = state.profile.profilePosts[state.profile.profilePosts.length - 1].id + 1
    let newPostObj = {
      id: newPostId,
      post: state.profile.newPost,
      likesCount: 0
    }
    state = { ...state, ...state.profile.profilePosts.push(newPostObj) }
    rerenderEntireTree(state, addPost, updatePost)
    state.profile.newPost = ''
  }
}

export const updatePost = (text) => {
  state.profile.newPost = text
  rerenderEntireTree(state, addPost, updatePost)
}

export default state