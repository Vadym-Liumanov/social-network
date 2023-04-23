import React from 'react'

import styles from './DownButton.module.css'
import downIcon from '../../../../assets/icons/down_icon.svg'

type PropsType = {
  onClick: () => void
}

const DownButton: React.FC<PropsType> = ({ onClick }) => {
  return (
    <button className={styles.downButton} onClick={onClick}>
      <img src={downIcon} alt="" />
    </button>
  )
}

export default React.memo(DownButton)