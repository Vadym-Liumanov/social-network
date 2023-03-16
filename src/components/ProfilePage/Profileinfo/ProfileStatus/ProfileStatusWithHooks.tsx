import React, { useState, useEffect, ChangeEvent } from 'react'

import cn from 'classnames'

import styles from './ProfileStatus.module.css'

type PropsType = {
  status: string
  updateMyStatus: (myStatus: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = ({ status, updateMyStatus }) => {

  useEffect((
    () => {
      setStatusText(status)
    }
  ), [status])

  const [editMode, setEditMode] = useState(false)
  const [statusText, setStatusText] = useState(status)

  const onChangeStatus = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
          <textarea
            onDoubleClick={() => setEditMode(true)}
            value={statusText || 'No status'}
            className={cn(styles.textarea)}
            readOnly
          />
        </div>
      }

      {editMode &&
        <div>
          <textarea
            autoFocus={true}
            onBlur={updateStatus}
            value={statusText}
            onChange={onChangeStatus}
            className={styles.textarea}
          />
        </div>
      }
    </div>

  )
}

export default ProfileStatusWithHooks