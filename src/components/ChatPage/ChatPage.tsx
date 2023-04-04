// TODO - разнести код по отдельным компонентам

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { getIsAuth } from '../../redux/auth-selectors'
import { getMessages } from '../../redux/chat-selectors'

import userAvatar from './../../assets/images/defaultUserImage.jpg'

import styles from './ChatPage.module.css'

import { ChatMessageType } from '../../api/chatAPI'
import { sendMessageThunk, startMessagesListeningThunk, stopMessagesListeningThunk } from '../../redux/chat-reducer'

// Message component
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

// Messages component
// TODO: Replace index as a key
const Messages: React.FC = () => {
  // Получаем массив сообщений из стейта через селектор
  const messages = useSelector(getMessages)

  return (
    <div className={styles.messages__body}>
      {messages.map((message, index) => {
        return <Message key={index} message={message} />
      })}
    </div>
  )
}

// AddMessageForm

const AddMessageForm: React.FC = () => {
  const dispatch = useDispatch()

  const [message, setMessage] = useState('')
  const [wsChannelReadyStatus, setWsChannelReadyStatus] = useState<'pending' | 'ready'>('pending')
  const [symbolsCounter, setSymbolsCounter] = useState<number>(0)

  // Лимит символов в сообщении
  const symbolsLimit: number = 100

  const onSendBtnClick = () => {
    if (!message) {
      setMessage('')
      setSymbolsCounter(0)
      return
    }
    dispatch(sendMessageThunk(message))
    setMessage('')
    setSymbolsCounter(0)
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const message = e.target.value
    const messageLenght = message ? message.length : 0
    if (messageLenght <= symbolsLimit) {
      setMessage(message)
      setSymbolsCounter(messageLenght)
    }
  }

  return (
    <div className={styles.form__body}>
      <textarea
        className={styles.form__textarea}
        onChange={onChangeHandler}
        value={message}
      />
      <button
        className={styles.form__button}
        onClick={onSendBtnClick}
        disabled={false}
      >
        Send
      </button>
      <div className={styles.form__counter}>
        {`${symbolsCounter}/${symbolsLimit}`}
      </div>

    </div>
  )
}

// ChatPage component

const ChatPage: React.FC = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(getIsAuth)

  useEffect(() => {
    /* При первом рендере диспатчим санку, по которой в API запускается ws канал
    и производится подписка BLL на получение массива messages по каналу*/
    dispatch(startMessagesListeningThunk())
    // Cleanup function
    return () => {
      dispatch(stopMessagesListeningThunk())
    }
  }, [])

  return (
    <>
      {!isAuth
        ? <Navigate replace to='/login' />
        : <div className={styles.wrapper}>
          <div className={styles.body}>
            <div className={styles.messagesContainer}>
              <Messages />
            </div>
            <div className={styles.formContainer}>
              <AddMessageForm />
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default React.memo(ChatPage)