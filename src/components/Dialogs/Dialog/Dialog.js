import React from 'react'

import dialogStyles from'./Dialog.module.css'

const Dialog = (props) => {
  return (
    <div className={dialogStyles.item}>
      <div>
        {props.dialogContent}
      </div>
    </div>
  );
}

export default Dialog
