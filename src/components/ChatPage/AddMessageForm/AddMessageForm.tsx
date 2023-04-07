import React, { useState } from "react"
import { useDispatch } from "react-redux"
import cn from 'classnames'

import { sendMessageThunk } from "../../../redux/chat-reducer"

import styles from './AddMessageForm.module.css'


const AddMessageForm: React.FC = () => {
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
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
                className={cn(styles.form__button, {
                    [styles.form__button_disabled]: symbolsCounter === 0
                })}
                onClick={onSendBtnClick}
                disabled={symbolsCounter === 0}
            >
                Send
            </button>
            <div className={styles.form__counter}>
                {`${symbolsCounter}/${symbolsLimit}`}
            </div>

        </div>
    )
}

export default React.memo(AddMessageForm)