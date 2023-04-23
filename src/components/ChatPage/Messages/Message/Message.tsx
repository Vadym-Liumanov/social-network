import React from 'react'

import styles from './Message.module.css'
import userAvatar from '../../../../assets/images/defaultUserImage.jpg'
import { ChatMessageType } from '../../../../redux/chat-reducer'


const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {

  return (
    <div className={styles.message}>

      <img
        src={message.photo ? message.photo : userAvatar}
        className={styles.message__authorAvatar}
        alt='userPhoto'
      />
      <span className={styles.message__authorName}>
        {message.userName}
      </span>

      <p className={styles.message__text}>
        {message.message}
      </p>
    </div>
  )
}

export default React.memo(Message)