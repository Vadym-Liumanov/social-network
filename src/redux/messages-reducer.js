const ADD_DIALOG = 'ADD-DIALOG'
const UPDATE_DIALOG = 'UPDATE-DIALOG'

export const addNewDilogActionCreator = () => {
  return { type: ADD_DIALOG }
}

export const updateNewDialogActionCreator = (text) => {
  return {
    type: UPDATE_DIALOG,
    text
  }
}

const initialState = {
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


const messagesReducer = (state = initialState, action) => { // state = state.messages
  switch (action.type) {

    case ADD_DIALOG:
      if (state.newDialog !== '') {
        let newDialogId = state.dialogs[state.dialogs.length - 1].id + 1
        let newDialogObj = {
          id: newDialogId,
          dialog: state.newDialog
        }
        state = {
          ...state,
          dialogs: [...state.dialogs, newDialogObj],
          newDialog: ''
        }
        return state
      }
      return state

    case UPDATE_DIALOG:
      state = {
        ...state,
        newDialog: action.text
      }
      return state

    default:
      return state
  }
}

export default messagesReducer