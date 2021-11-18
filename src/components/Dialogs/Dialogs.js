import React from 'react'

import dialogsStyles from './Dialogs.module.css'

import User from './User/User'
import Dialog from './Dialog/Dialog'

const Dialogs = (props) => {

  let dialogsUsersItems = Object.values(props.users).map(user => <User key={user.id} userName={user.userName} />)
  let dialogsContentItems = Object.values(props.dialogs).map(dialog => <Dialog key={dialog.id} dialogContent={dialog.dialog} />)

  let newDilogElement = React.createRef()

  let addNewDilog = () => {
    alert(newDilogElement.current.value)
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
            <textarea ref={newDilogElement} cols="30" rows="5"></textarea>
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
