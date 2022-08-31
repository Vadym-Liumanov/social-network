import { InferActionsTypes } from './store-redux'

const ADD_DIALOG = 'social_network/messages/ADD-DIALOG'

export const actionCreators = {
  addNewDilogAC: (text: string) => {
    return { type: ADD_DIALOG, text } as const
  }
}

type ActionCreatorsTypes = InferActionsTypes<typeof actionCreators>

// type UserType = {
//   id: number,
//   userName: string
// }
// type DialogType = {
//   id: number,
//   dialog: string
// }

// type InitialStateType = {
//   users: Array<UserType>,
//   dialogs: Array<DialogType>
// }

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

type StateType = typeof initialState

// getState().messages
const messagesReducer = (state = initialState, action: ActionCreatorsTypes): StateType => {
  switch (action.type) {

    case ADD_DIALOG:
      let newDialogId = state.dialogs[state.dialogs.length - 1].id + 1
      let newDialogObj = {
        id: newDialogId,
        dialog: action.text
      }
      return {
        ...state,
        dialogs: [...state.dialogs, newDialogObj]
      }

    default:
      return state
  }
}

export default messagesReducer