import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { getMessages } from '../../../redux/chat-selectors'
import Message from './Message/Message'
import DownButton from '../../common/Battons/DownButton/DownButton'

import styles from './Messages.module.css'

// Messages component
// TODO: Replace index as a key

const Messages: React.FC = () => {
    // Получаем массив сообщений из стейта через селектор
    const messages = useSelector(getMessages)
    // Инициализируем Ref для выполненния скроллинга в нижнюю часть окна messages (к тэгу div внизу окна)
    const anchorRef = useRef<HTMLDivElement>(null)

    /* Для реализации умного скроллинга - чтобы автоматически при поступлении новых сообщений скролл не перемещался 
    вниз окна, если мы читаем сообщения где-то в центре - для начала введем состояние isAutoScroll,
    которое в зависимости от условия (положения текущего скрола) будет включать (true) или выключать автоскроллинг
    к последнему сообщению в чате. Т.е. если положение скролла не около последнего сообщения, то автоскроллинг вниз
    срабатывать не будет.
    Также в дальнейшем можно будет добавить кнопку для скролла к последнему сообщению,
    привязав к состоянию isAutoScroll - если false, то отбразить кнопку перемотки вниз. */
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true)

    // Обработчик события onScroll. Включает-выключает автоскролл к последнему сообщению в зависимости от позиции скролла.
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget

        /* Условие включения автоскролла(все в px): общая высота контента - величина проскролленного контента сверху -
        - высота элемента, в котором определен скролл (у нас div высотой 360 px) должны быть <= 320 px */
        if (element.scrollHeight - element.scrollTop - element.clientHeight <= 320) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    /* При получении новых messages скролл должен опуститься ниже - поэтому используем useEffect
    с зависимостью от messages.
     */
    useEffect(() => {
        /* Перемотку (scrolling) делаем при помощи метода скролла к элементу (доступ к элементу - через ref).
        При этом проверяем, разрешен ли автоскролл. А до этого определяем условие включения-выключения автоскролла
        в зависимости от текущего положения скролла - на какую позицию его поставил пользователь.
        Для этого на родительскую ноду вешаем событие onScroll.
         */
        if (isAutoScroll) {
            scrollToBottom()
        }
    }, [messages])

    // Вспомогательная ф-ция скролла к элементу
    const scrollToBottom = () => {
        anchorRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={styles.messages__wrapper}>
            <div className={styles.messages__body} onScroll={scrollHandler}>
                {messages.map((message) => {
                    return <Message key={message.id} message={message} />
                })}
                {/* Используем пустой div под Ref для выполнения операций с ним по скроллингу */}
                <div ref={anchorRef}></div>
            </div>
            {!isAutoScroll &&
                <div className={styles.downButton__container}>
                    <div className={styles.downButton}>
                        <DownButton onClick={scrollToBottom} />
                    </div>
                </div>
            }
        </div>
    )
}

export default React.memo(Messages)