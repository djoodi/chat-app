import React from 'react'
import { Card } from 'react-bootstrap'
import MessageInput from './MessageInput'
import MessageList from './MessageList'

interface Props {
  selectedChannel: any;
}

const MessagePanel: React.FC<Props> = ({selectedChannel}) => {
  return (
    <div id='messagePanel' className='flex-grow-1 flex-column d-flex'>
      <h6 className='text-muted border-bottom border-3 p-2 mb-0'>{selectedChannel?.title}</h6>
      <MessageList />
      <MessageInput />
    </div>
  )
}

export default MessagePanel