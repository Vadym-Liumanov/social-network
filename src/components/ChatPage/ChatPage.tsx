import React from 'react'
import userAvatar from './../../assets/images/defaultUserImage.jpg'

const mockArr = [1, 2, 3, 4, 5]

const Message = (props: any) => {
  return (
    <div>
      <img src={userAvatar} style={{ width: '40px' }} />
      <span>
        {'Vasya Pupkin'}
      </span>
      <p>
        {'Hello world!'}
      </p>
    </div>
  )
}

const Messages = (props: any) => {
  return (
    <div>
      {mockArr.map((it, index) => {
        return <Message key={index} />
      })}
      {mockArr.map((it, index) => {
        return <Message key={index} />
      })}
      {mockArr.map((it, index) => {
        return <Message key={index} />
      })}
      {mockArr.map((it, index) => {
        return <Message key={index} />
      })}
    </div>
  )
}

const ChatPage = (props: any) => {
  return (
    <div>
      <div>
        <Messages />
      </div>
      <div>
        <textarea></textarea>
      </div>
      <div>
        <button>
          Send
        </button>
      </div>
    </div>
  )
}

export default React.memo(ChatPage)