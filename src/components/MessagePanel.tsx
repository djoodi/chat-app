import React from 'react'
import { Card } from 'react-bootstrap'
import { useAppSelector } from '../store/store'
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import * as Views from '../views';
import FriendRequestList from './FriendRequestList'


const MessagePanel: React.FC = () => {

  const channelTitle = useAppSelector((state)=>state.channels.selectedChannel.title);
  const view = useAppSelector((state)=>state.views.view);

  const displayTitle = () => {
    return channelTitle ? channelTitle.replace(" ", "-") : "";
  }

  return (
    <div id='messagePanel' className='flex-grow-1 flex-column d-flex'>
      <h6 className='text-muted border-bottom border-3 p-2 mb-0' id='message-panel-title'>
        {view === Views.SERVERS ? 
          displayTitle() 
          : view === Views.REQUESTS ?
          'Friend Requests'
            : null}
      </h6>
      {view === Views.SERVERS ? 
        <MessageList /> 
          : view === Views.FRIENDS ?
            <p>friend list view</p>
            : view === Views.REQUESTS ?
            <FriendRequestList />
              : null}
      <MessageInput />
    </div>
  )
}

export default MessagePanel