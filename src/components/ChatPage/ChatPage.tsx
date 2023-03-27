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

// Message component

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

// Messages component
// TODO: Replace index as key
const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [messagesList, setMessagesList] = useState<ChatMessagesType>([])

  useEffect(() => {
    const onMessageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data)
      setMessagesList((prevMessages) => [...prevMessages, ...newMessages])
    }
    wsChannel?.addEventListener('message', onMessageHandler)
    return () => {
      wsChannel?.removeEventListener('message', onMessageHandler)
    }
  }, [wsChannel])


  return (
    <div className={styles.messages__body}>
      {messagesList.map((message, index) => {
        return <Message key={index} message={message} />
      })}
    </div>
  )
}

// AddMessageForm

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [message, setMessage] = useState('')
  const [wsChannelReadyStatus, setWsChannelReadyStatus] = useState<'pending' | 'ready'>('pending')

  useEffect(() => {
    const onOpenHandler = () => {
      setWsChannelReadyStatus('ready')
    }
    wsChannel?.addEventListener('open', onOpenHandler)
    return () => {
      wsChannel?.removeEventListener('open', onOpenHandler)
    }
  }, [wsChannel])

  const onSendBtnClick = () => {
    if (!message) {
      setMessage('')
      return
    }
    wsChannel?.send(message)
    setMessage('')
  }

  return (
    <div className={styles.form__body}>
      <textarea
        className={styles.form__textarea}
        onChange={(e) => { setMessage(e.target.value) }}
        value={message}
      />
      <button
        className={styles.form__button}
        onClick={onSendBtnClick}
        disabled={wsChannel === null || wsChannelReadyStatus === 'pending'}
      >
        Send
      </button>
      <div className={styles.form__counter}>
        {'40/100'}
      </div>

    </div>
  )
}

// ChatPage component

const ChatPage: React.FC<any> = () => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

  useEffect(() => {
    let ws: WebSocket

    const onCloseHandler = () => {
      console.log('WS Channel CLOSE')
      setTimeout(() => {
        createWsChannel()
      }, 5000)
    }

    const createWsChannel = () => {
      ws?.removeEventListener('close', onCloseHandler)
      ws?.close()

      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws.addEventListener('close', onCloseHandler)
      setWsChannel(ws)
    }
    
    createWsChannel()

    // Cleanup function
    return () => {
      ws.removeEventListener('close', onCloseHandler)
      ws.close()
    }
  }, [])

  return (
    <div className={styles.wrapper}>

      <div className={styles.body}>

        <div className={styles.messagesContainer}>
          <Messages wsChannel={wsChannel} />
        </div>

        <div className={styles.formContainer}>
          <AddMessageForm wsChannel={wsChannel} />
        </div>

      </div>

    </div>
  )
}

export default React.memo(ChatPage)