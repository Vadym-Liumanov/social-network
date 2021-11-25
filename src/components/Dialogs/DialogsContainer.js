import React from 'react'

import Dialogs from './Dialogs'
import StoreContext from '../../StoreContext'
import { addNewDilogActionCreator, updateNewDialogActionCreator } from '../../redux/messages-reducer'

const DialogsContainer = (props) => {

  return (
    <StoreContext.Consumer>
      {(store) => {
        let state = store.getState()
        let users = state.messages.users
        let dialogs = state.messages.dialogs
        let newDialogText = state.messages.newDialog

        let addNewDialog = () => {
          store.dispatch(addNewDilogActionCreator())
        }

        let updateNewDialog = (text) => {
          store.dispatch(updateNewDialogActionCreator(text))
        }

        return (
          <Dialogs
            users={users}
            dialogs={dialogs}
            newDialogText={newDialogText}
            addNewDialog={addNewDialog}
            updateNewDialog={updateNewDialog}
          />
        )
      }

      }

    </StoreContext.Consumer>
  )
}

export default DialogsContainer