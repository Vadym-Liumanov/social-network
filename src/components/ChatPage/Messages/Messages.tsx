import React, { useEffect, useRef, useState } from 'react'
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
        - высота элемента, в котором определен скролл (у нас div высотой 360 px) долдны быть <= 160 px */
        if (element.scrollHeight - element.scrollTop - element.clientHeight <= 160) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    /* При получении новых messages скролл должен опуститься ниже - поэтому используем useEffect
    с зависимостью от messages.
     */
    useEffect(() => {
        /* Перемотку (scrolling) делаем при помощи нативного js с использованием интерфейса браузера.
        При этом проверяем, разрешен ли автоскролл. А до этого определяем условие включения-выключения автоскролла
        в зависимости от текущего положения скролла - на какую позицию его поставил пользователь.
        Для этого на родительскую ноду вешаем событие onScroll.
         */
        if (isAutoScroll) {
            anchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div className={styles.messages__body} onScroll={scrollHandler}>
            {messages.map((message) => {
                return <Message key={message.id} message={message} />
            })}
            {/* Используем пустой div под Ref для выполнения операций с ним по скроллингу */}
            <div ref={anchorRef}></div>
        </div>
    )
}

export default React.memo(Messages)