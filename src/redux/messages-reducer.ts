const ADD_DIALOG = 'social_network/messages/ADD-DIALOG'

type AddNewDilogACType = {
  type: typeof ADD_DIALOG,
  text: string
}

export const addNewDilogAC = (text: string): AddNewDilogACType => {
  return { type: ADD_DIALOG, text }
}

type UserType = {
  id: number,
  userName: string
}
type DialogType = {
  id: number,
  dialog: string
}

type InitialStateType = {
  users: Array<UserType>,
  dialogs: Array<DialogType>
}

const initialState: InitialStateType = {
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

// state = state.messages
const messagesReducer = (state = initialState, action: AddNewDilogACType): InitialStateType => { 
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