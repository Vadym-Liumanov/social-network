import messagesReducer from "./messages-reducer"
import profileReduser from "./profile-reducer"

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
    this._state.profile = profileReduser(this._state.profile, action)
    this._state.messages = messagesReducer(this._state.messages, action)
    this._callSubscriber(this._state)
  }
}

// window.store = store

export default store