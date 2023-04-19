/* Реализовывать взаимодействие DAL и BLL (chatAPI и chat-reducer) будем с изпользованием 
 паттерна publisher-subscriber. При этом реализуем множественную подписку на события 'event':
    'messages-received' - получаемые события по каналу;
    'status-changed' - статус (текущее состояние) WS сщединения.
 Подписчик (в нашем случае в chat-reducer) при вызове метода chatAPI.subscribe('event', callback(messages | status)),
 будет подписан на событие и оповещен с случае его изменения.*/

/* Для хранения подписок будем использовать объект с двумя массивами событий */

let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

// Описание типа для объекта сообщения 
export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export type StatusType = 'pending' | 'ready' | 'error'

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
type EventsNamesType = 'messages-received' | 'status-changed'

// Инициируем ws канал значением null
let ws: WebSocket | null = null

// Опишем обработчики событий ws-канала

// Ф-ция обработчика события "close" канала - каждые 5 сек пытается открыть закрытый канал
const onCloseHandler = () => {
    console.log('xxx WS Channel CLOSE xxx. Code must be 3')
    notifySubscribersAboutStatus('pending')
    setTimeout(createWsChannel, 5000)
}

/* Обработчик события "message" канала. Пушит поступившие messages в callback-и каждому подписчику.
При запуске обработчика (возникновении события на канале) выполнятся все callback-и подписчики.
Простыми словами - передаем messages подписчикам, а они у себя производят необходимые операции (суть callback-а)*/
const onMessageHandler = (e: MessageEvent) => {
    console.log('>>> New massages recieved. Code must be 1')
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

// Обработчик события "open" канала.
const onOpenHandler = () => {
    console.log('Status OPEN. Code 1')
    notifySubscribersAboutStatus("ready")
}

// Обработчик события "error" канала.
const onErrorHandler = (event: Event) => {
    console.log('!!! Error ocured !!!')
    notifySubscribersAboutStatus("error")
}

/* Вспомогательная ф-ция уведомления подписчиков события 'status-changed'.
Пробегаемся по всем callbacks и передаем в них изменившийся статус. */
const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

/* Вспомогательная ф-ция для зачистки созданных EventListeners */
const cleanUpFunction = () => {
    ws?.removeEventListener('close', onCloseHandler)
    ws?.removeEventListener('message', onMessageHandler)
    ws?.removeEventListener('error', onErrorHandler)
    ws?.removeEventListener('open', onOpenHandler)
}

// Ф-ция создания и реконнекта wsChannel-а. 
const createWsChannel = () => {
    /*Предварительно если WS соединение было открыто, то зачищаем его - удаляем eventListener-ы и закрываем канал. */
    ws?.close()
    cleanUpFunction()

    /*Создаем новое WS-соединение, оповещаем подписчиков о статусе канала 'pending'. 
    Добавляем eventListener-ы на события канала. */
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus("pending")
    ws.addEventListener('close', onCloseHandler)
    ws.addEventListener('message', onMessageHandler)
    ws.addEventListener('error', onErrorHandler)
    ws.addEventListener('open', onOpenHandler)
    // Запустим ф-цию проверки статуса канала с интервалом 1 с
    // setInterval(() => {
    //  }, 1000)
}

// Oбъект chatAPI, за медоды которого будем дергать его из других слоев, в частности из бизнес-слоя BLL (chat-reducer)
export const chatAPI = {
    // Метод создания ws-канала
    start() {
        createWsChannel()
    },
    /* Метод остановки канала.
    Обнуляем массивы в объекте подписчиков, убираем все eventListeners, закрываем соединение. */
    stop() {
        console.log('WS Stoped')
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        ws?.close()
        cleanUpFunction()
    },
    // Метод подписки - просто пушим callback подписчик в массив подписчиков
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        // Отписка сделана как в Redux через возврат ф-ции.
        // Также отписка сделана отдельным методом ниже. Как будем отписываться - решим дальше. 
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },

    // Метод отписки. Убираем callback-подписчик из массива подписчиков.

    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },

    // Метод отправки сообщений
    sendMessage(message: string) {
        ws?.send(message)
    }
}

/* 
Инфа по статусу готовности WS канала
Эти константы используются атрибутом readyState для описания состояния WebSocket-подключения:
CONNECTING	0	Соединение ещё не открыто.
OPEN	    1	Соединение открыто и готово к обмену данными.
CLOSING	    2	Соединение в процессе закрытия.
CLOSED	    3	Соединение закрыто или не может открыться.

onclose	    EventListener	Обработчик событий, вызываемый, когда readyState WebSocket соединения изменяется на CLOSED.
            Наблюдатель получает CloseEvent с именем "close".
onerror	    EventListener	Обработчик событий, вызываемый, когда происходит ошибка. Это простое событие,
            называемое "error".
onmessage	EventListener	Обработчик событий , вызываемый, когда получается сообщение с сервера.
            Наблюдатель получает MessageEvent, называемое "message".
onopen	    EventListener	Наблюдатель событий, вызываемый, когда readyState WebSocket - соединения изменяется 
            на OPEN; это показывает, что соединение готово отсылать и принимать данные.
            Это простое событие, называемое "open".
*/
