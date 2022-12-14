import React from 'react'
import { Card } from 'react-bootstrap'
import { useAppSelector } from '../store/store'
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import * as Views from '../views';
import FriendRequestList from './FriendRequestList'
import FriendTitle from './FriendTitle'

interface Props {
  acceptFriendRequest: (id: string) => void;
  declineFriendRequest: (id: string) => void;
  deleteFriend: (id: string) => void;
  sendMessage: (message: string) => void;
}

const MessagePanel: React.FC<Props> = ({ acceptFriendRequest, declineFriendRequest, deleteFriend, sendMessage }) => {

  const channelTitle = useAppSelector((state) => state.channels.selectedChannel.title);
  const view = useAppSelector((state) => state.views.view);

  const socketID = useAppSelector((state) => state.user.socketID);
  const friendRoomID = useAppSelector((state)=>state.user.selectedFriend.roomID);
  const channelRoomID = useAppSelector((state)=>state.channels.selectedChannel.id);


  const displayChannelTitle = () => {
    return channelTitle ? channelTitle.replace(" ", "-") : "";
  }

  return (
    <div id='messagePanel' className='flex-grow-1 flex-column d-flex w-60'>
      <div className='border-bottom border-3 messagePanelTitle'>
        {view === Views.SERVERS ?
          <h6 className='text-muted p-2 m-0'>
            {displayChannelTitle()}
          </h6>
          : view === Views.REQUESTS ?
            <h6 className='text-muted p-2 m-0'>Friend Requests</h6>
            : view === Views.DIRECT_MESSAGE ?
              <FriendTitle deleteFriend={deleteFriend} />
              : null
        }
      </div>

      <p>socket ID: {socketID}</p>
      <p>room ID: {view === Views.SERVERS ? channelRoomID : view === Views.DIRECT_MESSAGE ? friendRoomID : ""}</p>

      {view === Views.SERVERS ?
        <MessageList />
        : view === Views.FRIENDS ?
          null
          : view === Views.REQUESTS ?
            <FriendRequestList acceptFriendRequest={acceptFriendRequest} declineFriendRequest={declineFriendRequest} />
            : null}
      <MessageInput sendMessage={sendMessage}/>
    </div>
  )
}

export default MessagePanel