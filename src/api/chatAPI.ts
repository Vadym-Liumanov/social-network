/* Реализовывать взаимодействие DAL и BLL будем с изпользованием 
 паттерна publisher-subscriber. При этом реализуем множественную 
подписку на события, поэтому используем массив subscribers */


let subscribers = [] as SubscriberType[]

// Инициируем ws канал значением null
let ws: WebSocket | null = null

//  Создаем ф-цию реконнекта wsChannel-а. 
const createWsChannel = () => {
    /*Предварительно если WS соединение было открыто, то зачищаем его
     - удаляем eventListener-ы и закрываем канал. */
    ws?.removeEventListener('close', onCloseHandler)
    ws?.removeEventListener('message', onMessageHandler)
    ws?.close()
    /*Создаем новое WS-соединение, добавляем eventListener-ы на интересующие события.
    При этом для добавления-удаления eventListener-ов используем одни и те же ф-ции обработчиков событий,
    которые описаны отдельно */
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', onCloseHandler)
    ws.addEventListener('message', onMessageHandler)
}

// Ф-ция обработчика события close канала - каждые 5 сек пытается открыть закрытый канал
const onCloseHandler = () => {
    console.log('WS Channel CLOSE')
    setTimeout(createWsChannel, 5000)
}

/* Обработчик события message канала. Пушит поступившие messages в callback-и каждому подписчику.
При запуске обработчика (возникновении события на канале) выполнятся все callback-и подписчики.
Простыми словами - передаем messages подписчикам, а они у себя производят необходимые операции (суть callback-а)*/ 
const onMessageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

// Создаем объект chatAPI, за медоды которого будем дергать его из других слоев, в частности BLL (chat-reducer)
export const chatAPI = {
    // Метод создания ws-канала
    start() {
        createWsChannel()
    },
    // Метод остановки канала.
    /* Убираем все eventListeners, закрываем соединение */
    stop() {
        subscribers = []
        ws?.removeEventListener('close', onCloseHandler)
        ws?.removeEventListener('message', onMessageHandler)
        ws?.close()
    },
    // Метод подписки - просто пушим callback подписчика в массив подписчиков
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        // Отписка сделана как в Redux через возврат ф-ции.
        // Также отписка сделана отдельным методом ниже. Как будем отписываться - решим дальше. 
        return () => subscribers.filter(s => s !== callback)
    },
    // Метод отписки. Убираем callback из массива подписчиков.
    unsubscribe(callback: SubscriberType) {
        subscribers.filter(s => s !== callback)
    },
    // Метод отправки сообщений
    sendMessage(message: string) {
        ws?.send(message)
    }
}

// Описание типа для объекта сообщения 
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
// Описание типа для подписчика - это callback ф-ция, кот. принимает массив сообщений и что-то там делает, ничего не возвращая 
type SubscriberType = (messages: ChatMessageType[]) => void