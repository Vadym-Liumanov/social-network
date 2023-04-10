/* Реализовывать взаимодействие DAL и BLL (chatAPI и chat-reducer) будем с изпользованием 
 паттерна publisher-subscriber. При этом реализуем множественную подписку на события (подписчик при вызове метода 
 chatAPI.subscribe(callback(messages | status)), поэтому используем массив subscribers */

let subscribers = [] as SubscriberType[]

// Инициируем ws канал значением null
let ws: WebSocket | null = null

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

const cleanUpFunctions = () => {
    ws?.removeEventListener('close', onCloseHandler)
    ws?.removeEventListener('message', onMessageHandler)
    ws?.removeEventListener('error', onErrorHandler)
    ws?.removeEventListener('open', onOpenHandler)
}

//  Создаем ф-цию реконнекта wsChannel-а. 
const createWsChannel = () => {
    /*Предварительно если WS соединение было открыто, то зачищаем его
     - удаляем eventListener-ы и закрываем канал. */
    ws?.close()
    cleanUpFunctions()


    /*Создаем новое WS-соединение, добавляем eventListener-ы на интересующие события.
    При этом для добавления-удаления eventListener-ов используем одни и те же ф-ции обработчиков событий,
    которые описаны отдельно */
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    // debugger
    ws.addEventListener('close', onCloseHandler)
    ws.addEventListener('message', onMessageHandler)
    ws.addEventListener('error', onErrorHandler)
    ws.addEventListener('open', onOpenHandler)
}

// Ф-ция обработчика события close канала - каждые 5 сек пытается открыть закрытый канал
const onCloseHandler = () => {
    // debugger
    console.log('xxx WS Channel CLOSE xxx. Code must be 3')
    console.log(ws?.readyState)
    setTimeout(createWsChannel, 5000)
}
const onErrorHandler = () => {
    // debugger
    console.error('!!! Error ocured !!!')
    console.log('!!! Error ocured !!!')
    console.log(ws?.readyState)
}
const onOpenHandler = () => {
    // debugger
    console.log('Status OPEN. Code 1')
    console.log(ws?.readyState)
}

/* Обработчик события message канала. Пушит поступившие messages в callback-и каждому подписчику.
При запуске обработчика (возникновении события на канале) выполнятся все callback-и подписчики.
Простыми словами - передаем messages подписчикам, а они у себя производят необходимые операции (суть callback-а)*/
const onMessageHandler = (e: MessageEvent) => {
    // debugger
    console.log('>>> New massages recieved. Code must be 1')
    console.log(ws?.readyState)
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
        ws?.close()
        subscribers = []
        cleanUpFunctions()
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