import React, { useState, useEffect } from 'react'

import styles from './ProfileStatus.module.css'

const ProfileStatusWithHooks = (props) => {

  useEffect((
    () => {
      setStatusText(props.status)
    }
  ), [props.status])

  const [editMode, setEditMode] = useState(false)
  const [statusText, setStatusText] = useState(props.status)

  const onChangeStatus = (e) => {
    setStatusText(e.target.value)
  }

  const updateStatus = () => {
    if (statusText !== props.status) {
      props.updateMyStatus(statusText)
    }
    setEditMode(false)
  }

  return (

    <div className={styles.status}>
      {!editMode &&
        <div>
          <span onDoubleClick={() => setEditMode(true)}>{statusText || 'No status'}</span>
        </div>
      }

      {editMode &&
        <div>
          <input autoFocus={true} onBlur={updateStatus} value={statusText} onChange={onChangeStatus} />
        </div>
      }
    </div>

  )
}

export default ProfileStatusWithHooks