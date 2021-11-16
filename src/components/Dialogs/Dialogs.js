import React from 'react'

import dialogsStyles from './Dialogs.module.css'

import User from './User/User'
import Dialog from './Dialog/Dialog'

import dialogsContent from '../../Data/dialogsContent'
import dialogsUsers from '../../Data/dialogsUsers'

const Dialogs = () => {

  return (
    <div className={dialogsStyles.content}>
      <div>
        <div>
          NickNames
        </div>
        <div>
          <User userName={dialogsUsers[0].userName} />
          <User userName={dialogsUsers[1].userName} />
          <User userName={dialogsUsers[2].userName} />
          <User userName={dialogsUsers[3].userName} />
        </div>
      </div>
      <div>
        <div>
          DIALOGS
        </div>
        <div>
          <Dialog dialogContent={dialogsContent[0].dialogContent} />
          <Dialog dialogContent={dialogsContent[1].dialogContent} />
          <Dialog dialogContent={dialogsContent[2].dialogContent} />
          <Dialog dialogContent={dialogsContent[3].dialogContent} />
        </div>
      </div>
    </div>
  );
}

export default Dialogs
