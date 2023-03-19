import React from 'react'
import cn from 'classnames'

import styles from './FollowButton.module.css'

type PropsType = {
  followButtonText: string
  onFollowButtonClick: () => void
  isDisabled: boolean
}

const FollowButton: React.FC<PropsType> = ({ onFollowButtonClick, followButtonText, isDisabled }) => {
  return (
    <button
      className={styles.followBtn}
      onClick={onFollowButtonClick}
      disabled={isDisabled}
    >
      {followButtonText}
    </button>
  )
}

export default React.memo(FollowButton)