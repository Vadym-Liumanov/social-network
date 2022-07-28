import React, { useState, useEffect } from 'react'

import styles from './ProfileStatus.module.css'

const ProfileStatusWithHooks = ({ status, updateMyStatus }) => {

  useEffect((
    () => {
      setStatusText(status)
    }
  ), [status])

  const [editMode, setEditMode] = useState(false)
  const [statusText, setStatusText] = useState(status)

  const onChangeStatus = (e) => {
    setStatusText(e.target.value)
  }

  const updateStatus = () => {
    if (statusText !== status) {
      updateMyStatus(statusText)
    }
    setEditMode(false)
  }

  return (

    <div className={styles.status}>
      {!editMode &&
        <div>
          <input
            onDoubleClick={() => setEditMode(true)}
            value={statusText || 'No status'}
            className={styles.input + ' ' + styles.input_passive}
            readOnly
          />
        </div>
      }

      {editMode &&
        <div>
          <input
            autoFocus={true}
            onBlur={updateStatus}
            value={statusText}
            onChange={onChangeStatus}
            className={styles.input}
          />
        </div>
      }
    </div>

  )
}

export default ProfileStatusWithHooks