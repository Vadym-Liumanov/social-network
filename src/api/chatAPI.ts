// Реализовывать взаимодействие DAL и BLL будем с изпользованием 
// паттерна publisher-subscriber. При этом реализуем множественную 
// подписку на события, поэтому используем массив subscribers

let subscribers = [] as SubscriberType[]

// Создаем ф-цию реконнекта wsChannel-а. Предварительно если WS соединение было открыто
// то зачищаем его - удаляем слушатели событий и закрываем канал.

let ws: WebSocket | null = null

const createWsChannel = () => {
    ws?.removeEventListener('close', onCloseHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', onCloseHandler)
    ws.addEventListener('message', onMessageHandler)
}

// Ф-ция обработчика события close канала - каждые 5 сек пытается
// открыть закрытый канал
const onCloseHandler = () => {
    console.log('WS Channel CLOSE')
    setTimeout(createWsChannel, 5000)
}

// Обработчик события message канала. Пушит поступившие сообщения
// в callback-и каждому подписчику
const onMessageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}


// Создаем API, за медоды которого будем дергать его из других слоев.
export const chatAPI = {
    // Метод создания ws канала
    start() {
        createWsChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', onCloseHandler)
        ws?.removeEventListener('message', onMessageHandler)
        ws?.close()
    },
    // Метод подписки
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        // Отписка сделана как в Redux через возврат ф-ции
        // Также отписка продублирована в следующем методе 
        // unsubscribe - каким пользоваться решим позже
        return () => subscribers.filter(s => s !== callback)
    },
    // Метод отписки - хотя он и реализован в 1-м методе
    unsubscribe(callback: SubscriberType) {
        subscribers.filter(s => s !== callback)
    },
    // Метод отправки сообщений
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type SubscriberType = (messages: ChatMessageType[]) => void

