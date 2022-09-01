import React from 'react'
import { Card } from 'react-bootstrap'
import MessageInput from './MessageInput'
import MessageList from './MessageList'

const MessagePanel = () => {
  return (
    <div id='messagePanel' className='d-flex flex-column flex-grow justify-self-stretch'>
      <h6 className='text-muted'>#channel-title</h6>
      <MessageList />
      <MessageInput />
    </div>
  )
}

export default MessagePanel