import React from 'react'

import dialogsStyles from './Dialogs.module.css'

import User from './User/User'
import Dialog from './Dialog/Dialog'

import dialogsContent from '../../Data/dialogsContent'
import dialogsUsers from '../../Data/dialogsUsers'

let dialogsUsersItems = dialogsUsers.map(user => <User key={user.id} userName={user.userName} />)
let dialogsContentItems = dialogsContent.map(dialog => <Dialog key={dialog.id} dialogContent={dialog.dialogContent} />)

const Dialogs = () => {

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
      </div>
    </div>
  );
}

export default Dialogs
