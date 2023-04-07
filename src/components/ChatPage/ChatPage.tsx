import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Messages from './Messages/Messages'
import AddMessageForm from './AddMessageForm/AddMessageForm'

import { getIsAuth } from '../../redux/auth-selectors'

import styles from './ChatPage.module.css'

import { startMessagesListeningThunk, stopMessagesListeningThunk } from '../../redux/chat-reducer'

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