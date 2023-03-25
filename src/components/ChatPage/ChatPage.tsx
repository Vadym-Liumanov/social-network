import React from 'react'
import userAvatar from './../../assets/images/defaultUserImage.jpg'

import styles from './ChatPage.module.css'

const mockArr = [1, 2, 3, 4, 5]

const Message = (props: any) => {
  return (
    <div className={styles.message}>

      <img
        src={userAvatar}
        className={styles.message__authorAvatar}
      />
      <span className={styles.message__authorName}>
        {'Vasya Pupkin'}
      </span>

      <p className={styles.message__text}>
        {'Hello!'}
      </p>
    </div>
  )
}

const Messages = (props: any) => {
  return (
    <div className={styles.messages__body}>
      {mockArr.map((it, index) => {
        return <Message key={index} />
      })}
    </div>
  )
}

const ChatPage = (props: any) => {
  return (
    <div className={styles.wrapper}>

      <div className={styles.body}>

        <div className={styles.messagesContainer}>
          <Messages />
        </div>

        <div className={styles.formContainer}>

          <div className={styles.form__body}>
            <textarea className={styles.form__textarea} />
            <button className={styles.form__button}>
              Send
            </button>
            <div className={styles.form__counter}>
              {'40/100'}
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default React.memo(ChatPage)