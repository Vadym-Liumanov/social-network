import React from 'react'

import styles from './PrimaryButton.module.css'

type PropsType = {
  text: string
  onClick: () => void
}

const PrimaryButton: React.FC<PropsType> = ({ text, onClick }) => {
  return (

    <button className={styles.primaryButton} onClick={onClick}>
      <span>{text}</span>
    </button>
  )
}

export default React.memo(PrimaryButton)