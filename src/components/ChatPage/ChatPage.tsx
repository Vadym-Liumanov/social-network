import React, { useEffect, useState } from 'react'
import userAvatar from './../../assets/images/defaultUserImage.jpg'

import styles from './ChatPage.module.css'

type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

type ChatMessagesType = ChatMessageType[]

const WebSocketChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const mockArr = [1, 2, 3, 4, 5]

// {
//   message: "asdasd",
//   photo:        "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=4",
//   userId: 2,
//   userName: "samurai dimych"
// }

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div className={styles.message}>

      <img
        src={message.photo ? message.photo : userAvatar}
        className={styles.message__authorAvatar}
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

const Messages: React.FC<{ messages: ChatMessagesType }> = ({ messages }) => {
  return (
    <div className={styles.messages__body}>
      {messages.map((message, index) => {
        return <Message key={index} message={message} />
      })}
    </div>
  )
}

const ChatPage = (props: any) => {
  const [messagesList, setMessagesList] = useState<ChatMessagesType>([])
  const [message, setMessage] = useState('')

  const onSendBtnClick = () => {
    if (!message.trim()) {
      setMessage('')
      return
    }
    WebSocketChannel.send(message.trim())
    setMessage('')
  }

  useEffect(() => {
    WebSocketChannel.addEventListener('message', (e) => {
      const newMessages: ChatMessagesType = JSON.parse(e.data)
      setMessagesList((prevMessages) => [...prevMessages, ...newMessages])
      console.log(messagesList)
    })
  }, [])

  return (
    <div className={styles.wrapper}>

      <div className={styles.body}>

        <div className={styles.messagesContainer}>
          <Messages messages={messagesList} />
        </div>

        <div className={styles.formContainer}>

          <div className={styles.form__body}>
            <textarea
              className={styles.form__textarea}
              onChange={(e) => { setMessage(e.target.value) }}
              value={message}
            />
            <button
              className={styles.form__button}
              onClick={onSendBtnClick}
            >
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