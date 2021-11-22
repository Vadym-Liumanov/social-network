import React from 'react'

import dialogsStyles from './Dialogs.module.css'

import User from './User/User'
import Dialog from './Dialog/Dialog'

import { addNewDilogActionCreator, updateNewDialogActionCreator } from '../../redux/state'

const Dialogs = (props) => {

  let dialogsUsersItems = Object.values(props.state.users).map(user => <User key={user.id} userName={user.userName} />)
  let dialogsContentItems = Object.values(props.state.dialogs).map(dialog => <Dialog key={dialog.id} dialogContent={dialog.dialog} />)

  let newDialogText = props.state.newDialog
  let newDilogElement = React.createRef()

  let addNewDilog = () => {
    props.dispatch(addNewDilogActionCreator())
  }

  let updateNewDialog = () => {
    let text = newDilogElement.current.value
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
            <textarea ref={newDilogElement} onChange={updateNewDialog} cols="30" rows="5" value={newDialogText} />
          </div>
          <div>
            <button onClick={addNewDilog}>Add dialog</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialogs
