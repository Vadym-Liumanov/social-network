import React from 'react'
import { useSelector } from 'react-redux'

import { getMessages } from '../../../redux/chat-selectors'
import Message from './Message/Message'

import styles from './Messages.module.css'

// Messages component
// TODO: Replace index as a key

const Messages: React.FC = () => {
    // Получаем массив сообщений из стейта через селектор
    const messages = useSelector(getMessages)

    return (
        <div className={styles.messages__body}>
            {messages.map((message) => {
                return <Message key={message.id} message={message} />
            })}
        </div>
    )
}

export default React.memo(Messages)