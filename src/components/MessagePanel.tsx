import React from 'react'
import { Card } from 'react-bootstrap'
import { useAppSelector } from '../store/store'
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import * as Views from '../views';
import FriendRequestList from './FriendRequestList'

interface Props {
  acceptFriendRequest: (id: string) => void;
  declineFriendRequest: (id: string) => void;
}

const MessagePanel: React.FC<Props> = ({acceptFriendRequest,declineFriendRequest}) => {

  const channelTitle = useAppSelector((state)=>state.channels.selectedChannel.title);
  const view = useAppSelector((state)=>state.views.view);
  const selectedFriend = useAppSelector((state)=>state.user.selectedFriend);

  const displayTitle = () => {
    return channelTitle ? channelTitle.replace(" ", "-") : "";
  }

  return (
    <div id='messagePanel' className='flex-grow-1 flex-column d-flex w-60'>
      <h6 className='text-muted border-bottom border-3 p-2 mb-0' id='message-panel-title'>
        {view === Views.SERVERS ? 
          displayTitle() 
          : view === Views.REQUESTS ?
            'Friend Requests'
            : view === Views.DIRECT_MESSAGE ?
              selectedFriend.username
              : null
              }
      </h6>
      {view === Views.SERVERS ? 
        <MessageList /> 
          : view === Views.FRIENDS ?
            null
            : view === Views.REQUESTS ?
            <FriendRequestList acceptFriendRequest={acceptFriendRequest} declineFriendRequest={declineFriendRequest}/>
              : null}
      <MessageInput />
    </div>
  )
}

export default MessagePanel