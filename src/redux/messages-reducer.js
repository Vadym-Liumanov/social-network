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

const messagesReducer = (state, action) => { // state = state.messages
  switch (action.type) {

    case ADD_DIALOG:
      if (state.newDialog !== '') {
        let newDialogId = state.dialogs[state.dialogs.length - 1].id + 1
        let newDialogObj = {
          id: newDialogId,
          dialog: state.newDialog
        }
        state = { ...state, ...state.dialogs.push(newDialogObj) }
        state.newDialog = ''
      }
      return state

    case UPDATE_DIALOG:
      state.newDialog = action.text
      return state

    default:
      return state

  }

}

export default messagesReducer