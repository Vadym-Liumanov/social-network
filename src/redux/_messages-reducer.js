const ADD_DIALOG = 'social_network/messages/ADD-DIALOG'

export const addNewDilogAC = (text) => {
  return { type: ADD_DIALOG, text }
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
  ]
}


const messagesReducer = (state = initialState, action) => { // state = state.messages
  switch (action.type) {

    case ADD_DIALOG:
      let newDialogId = state.dialogs[state.dialogs.length - 1].id + 1
      let newDialogObj = {
        id: newDialogId,
        dialog: action.text
      }
      return {
        ...state,
        dialogs: [...state.dialogs, newDialogObj],
      }

    default:
return state
  }
}

export default messagesReducer