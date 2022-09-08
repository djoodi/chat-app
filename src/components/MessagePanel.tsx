import React from 'react'
import { Card } from 'react-bootstrap'
import { useAppSelector } from '../store/store'
import MessageInput from './MessageInput'
import MessageList from './MessageList'


const MessagePanel: React.FC = () => {

  const channelTitle = useAppSelector((state)=>state.channels.selectedChannel.title);

  const displayTitle = () => {
    return channelTitle ? channelTitle.replace(" ", "-") : "";
  }

  return (
    <div id='messagePanel' className='flex-grow-1 flex-column d-flex'>
      <h6 className='text-muted border-bottom border-3 p-2 mb-0'>{displayTitle()}</h6>
      <MessageList />
      <MessageInput />
    </div>
  )
}

export default MessagePanel