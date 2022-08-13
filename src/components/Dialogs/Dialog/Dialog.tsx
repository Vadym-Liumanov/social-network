import React from 'react'

import dialogStyles from './Dialog.module.css'

type PropsType = {
  dialogContent: string
}

const Dialog: React.FC<PropsType> = ({ dialogContent }) => {
  return (
    <div className={dialogStyles.item}>
      <div>
        {dialogContent}
      </div>
    </div>
  )
}

export default Dialog
