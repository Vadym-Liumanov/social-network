import React from 'react'
import userAvatar from './../../assets/images/defaultUserImage.jpg'

import styles from './ChatPage.module.css'

const mockArr = [1, 2, 3, 4, 5]

const Message = (props: any) => {
  return (
    <div>
      <img src={userAvatar} style={{ width: '40px' }} />
      <span>
        {'Vasya Pupkin'}
      </span>
      <p>
        {'Hello world!'}
      </p>
    </div>
  )
}

const Messages = (props: any) => {
  return (
    <div>
      {mockArr.map((it, index) => {
        return <Message key={index} />
      })}
      {mockArr.map((it, index) => {
        return <Message key={index} />
      })}
      {mockArr.map((it, index) => {
        return <Message key={index} />
      })}
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
        <div className={styles.form}>
          <div className={styles.textareaBlock}>
            <textarea></textarea>
          </div>
          <div className={styles.textareaBlock}>
            <button>
              Send
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default React.memo(ChatPage)