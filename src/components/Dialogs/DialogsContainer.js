import React from 'react'

import Dialogs from './Dialogs'

import { addNewDilogActionCreator, updateNewDialogActionCreator } from '../../redux/messages-reducer'

const DialogsContainer = (props) => {

  let state = props.store.getState()
  let users = state.messages.users
  let dialogs = state.messages.dialogs
  let newDialogText = state.messages.newDialog

  let addNewDialog = () => {
    props.store.dispatch(addNewDilogActionCreator())
  }

  let updateNewDialog = (text) => {
    props.store.dispatch(updateNewDialogActionCreator(text))
  }

  return (
    <Dialogs users={users} dialogs={dialogs} newDialogText={newDialogText} addNewDialog={addNewDialog} updateNewDialog={updateNewDialog} />
  )
}

export default DialogsContainer
