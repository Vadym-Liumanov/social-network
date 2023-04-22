import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import cn from 'classnames'

import { sendMessageThunk } from "../../../redux/chat-reducer"

import styles from './AddMessageForm.module.css'
import { StatusType } from "../../../api/chatAPI"

type PropsType = {
    channelStatus: StatusType
}

const AddMessageForm: React.FC<PropsType> = ({ channelStatus }) => {
    const dispatch = useDispatch()

    const [message, setMessage] = useState('')
    const [symbolsCounter, setSymbolsCounter] = useState<number>(0)

    // Лимит символов в сообщении (ограничение сервера)
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

    /* Ф-ция для блокировки (disable) кнопки отправки сообщений. Будет использоваться также при отправке сообщения по сочитанию клавиш.
    True - если в сообщении есть символы и статус ws-канала ready.
    */
    const isSendAllowed = () => (symbolsCounter !== 0) && (channelStatus === 'ready')

    /* Для отправки сообщения по комбинации клавиш Ctrl+Enter используем useEffect, где добавим прослушивание события keyup.
    На это событие вешаем обработчик keyupHandler, в кот. отслеживанием отжатие комбинации клавиш Ctrl+Enter, и если отправка 
    сообщений доступна - отправляем сообщение.
    */

    const keyupHandler = (e: KeyboardEvent) => {
        if (isSendAllowed()) {
            if (e.ctrlKey && e.key === 'Enter') {
                onSendBtnClick()
            }
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', keyupHandler)
        // Cleanup function
        return () => {
            document.removeEventListener('keyup', keyupHandler)
        }
    })

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
                disabled={!isSendAllowed()}
                title='Ctrl+Enter'
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