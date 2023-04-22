import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { getMessages } from '../../../redux/chat-selectors'
import Message from './Message/Message'

import styles from './Messages.module.css'

// Messages component
// TODO: Replace index as a key

const Messages: React.FC = () => {
    // Получаем массив сообщений из стейта через селектор
    const messages = useSelector(getMessages)
    // Инициализируем Ref для выполненния скроллинга в нижнюю часть окна messages (к тэгу div внизу окна)
    const anchorRef = useRef<HTMLDivElement>(null)

    /* При получении новых messages скрол должен опуститься ниже - поэтому используем useEffect
    с зависимостью от messages.
     */
    useEffect(() => {
        // Перемотку (scrolling) делаем при помощи нативного js с использованием интерфейса браузера
        anchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className={styles.messages__body}>
            {messages.map((message) => {
                return <Message key={message.id} message={message} />
            })}
            {/* Используем пустой div под Ref для выполнения операций с ним по скроллингу */}
            <div ref={anchorRef}></div>
        </div>
    )
}

export default React.memo(Messages)