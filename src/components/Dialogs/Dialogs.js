import React from 'react'

import dialogsStyles from './Dialogs.module.css'

import User from './User/User'
import Dialog from './Dialog/Dialog'

const Dialogs = () => {

  const dialog_1 = 'How are you?'
  const dialog_2 = 'I am fine.'
  const dialog_3 = 'What are you doing?'
  const dialog_4 = 'Let\'s go to the stadium.'

  return (
    <div className={dialogsStyles.content}>
      <div>
        <div>
          NickNames
        </div>
        <div>
          <User userName="Dima" />
          <User userName="Helen" />
          <User userName="Vovan" />
          <User userName="Alex" />
        </div>
      </div>
      <div>
        <div>
          DIALOGS
        </div>
        <div>
          <Dialog dialogContent={dialog_1} />
          <Dialog dialogContent={dialog_2} />
          <Dialog dialogContent={dialog_3} />
          <Dialog dialogContent={dialog_4} />
        </div>
      </div>
    </div>
  );
}

export default Dialogs
