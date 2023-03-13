import React from 'react'
import cn from 'classnames'

import styles from './LoginButton.module.css'

import btnPreloader from './../../../../assets/preloaders/circle.svg'

type PropsType = {
  isDisabled: boolean
  isFetching: boolean
  text: string
}

const LoginButton: React.FC<PropsType> = ({ isDisabled, isFetching, text }) => {
  return (
    <button className={styles.submitButton} type="submit" disabled={isDisabled || isFetching}>
      <img className={cn(styles.preloader, { [styles._active]: isFetching })} src={btnPreloader} alt="" />
      <span>{text}</span>
    </button>
  )
}

export default React.memo(LoginButton)