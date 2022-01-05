import React from 'react'

import dialogsStyles from './Dialogs.module.css'

import User from './User/User'
import Dialog from './Dialog/Dialog'
import { Redirect } from 'react-router-dom'

const Dialogs = (props) => {

  let dialogsUsersItems = Object.values(props.users).map(user => <User key={user.id} userName={user.userName} />)
  let dialogsContentItems = Object.values(props.dialogs).map(dialog => <Dialog key={dialog.id} dialogContent={dialog.dialog} />)

  let newDialogText = props.newDialogText

  let addNewDilog = () => {
    props.addNewDialog()
  }

  let updateNewDialog = (event) => {
    let text = event.target.value
    props.updateNewDialog(text)
  }

  // debugger

  if (!props.isAuth) {
    return (
      <Redirect to='/login' />
    )
  }

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
