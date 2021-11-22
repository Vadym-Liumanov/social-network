const ADD_POST = 'ADD-POST'
const UPDATE_POST = 'UPDATE-POST'
const ADD_DIALOG = 'ADD-DIALOG'
const UPDATE_DIALOG = 'UPDATE-DIALOG'



let store = {
  _state: {
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
      ],
      newDialog: ''
    }
  },
  _callSubscriber() {
    console.log('State has changed')
  },

  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {
    if (action.type === 'ADD-POST') {
      if (this._state.profile.newPost !== '') {
        let newPostId = this._state.profile.profilePosts[this._state.profile.profilePosts.length - 1].id + 1
        let newPostObj = {
          id: newPostId,
          post: this._state.profile.newPost,
          likesCount: 0
        }
        this._state = { ...this._state, ...this._state.profile.profilePosts.push(newPostObj) }
        this._callSubscriber(this._state)
        this._state.profile.newPost = ''
      }
    }

    if (action.type === 'ADD-DIALOG') {
      if (this._state.messages.newDialog !== '') {
        let newDialogId = this._state.messages.dialogs[this._state.messages.dialogs.length - 1].id + 1
        let newDialogtObj = {
          id: newDialogId,
          dialog: this._state.messages.newDialog
        }
        this._state = { ...this._state, ...this._state.messages.dialogs.push(newDialogtObj) }
        this._callSubscriber(this._state)
        this._state.messages.newDialog = ''
      }
    }

    if (action.type === 'UPDATE-POST') {
      this._state.profile.newPost = action.text
      this._callSubscriber(this._state)
    }

    if (action.type === 'UPDATE-DIALOG') {
      this._state.messages.newDialog = action.text
      this._callSubscriber(this._state)
    }
  }
}

export const addPostActionCreator = () => {
  return { type: ADD_POST }
}

export const addNewDilogActionCreator = () => {
  return { type: ADD_DIALOG }
}

export const updatePostActionCreator = (text) => {
  return {
    type: UPDATE_POST,
    text
  }
}

export const updateNewDialogActionCreator = (text) => {
  return {
    type: UPDATE_DIALOG,
    text
  }
}

window.store = store

export default store