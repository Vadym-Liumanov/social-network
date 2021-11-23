import React from 'react'

import dialogsStyles from './Dialogs.module.css'

import User from './User/User'
import Dialog from './Dialog/Dialog'

import { addNewDilogActionCreator, updateNewDialogActionCreator } from '../../redux/state'

const Dialogs = (props) => {

  let dialogsUsersItems = Object.values(props.state.users).map(user => <User key={user.id} userName={user.userName} />)
  let dialogsContentItems = Object.values(props.state.dialogs).map(dialog => <Dialog key={dialog.id} dialogContent={dialog.dialog} />)

  let newDialogText = props.state.newDialog

  let addNewDilog = () => {
    props.dispatch(addNewDilogActionCreator())
  }

  let updateNewDialog = (event) => {
    let text = event.target.value
    props.dispatch(updateNewDialogActionCreator(text))
  }

  // debugger

  return (
    <div className={dialogsStyles.content}>
      <div>
        <div>
          NickNames
        </div>
        <div>
          {dialogsUsersItems}
        </div>
      </div>
      <div>
        <div>
          DIALOGS
        </div>
        <div>
          {dialogsContentItems}
        </div>
        <div>
          <div>
            <textarea onChange={updateNewDialog} value={newDialogText} placeholder="Input your message here" />
          </div>
          <div>
            <button onClick={addNewDilog}>Add message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialogs
