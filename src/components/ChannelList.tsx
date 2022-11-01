import React from 'react'
import { IChannel, IEditChannelAction } from '../models';
import ChannelAddButton from './ChannelAddButton';
import Channel from './Channel';
import ServerInfo from './ServerInfo';
import './styles.css';
import UserInfo from './UserInfo';
import { useAppSelector } from '../store/store';
import * as Views from '../views';
import AddFriendButton from './AddFriendButton';
import FriendList from './FriendList';

interface Props {
  deleteServerReq: (arg:string)=>void;
  renameServerReq: (title:string)=>void;
  editChannelsReq: (actions: IEditChannelAction[])=>void;
  logout: ()=>void;
  createChannelReq: (title:string)=>void;
  sendFriendRequest: (recipient: string, callback: (message: string, isSuccess: boolean) => void)=>void;
}

const ChannelList: React.FC<Props> = ({ deleteServerReq, renameServerReq, editChannelsReq, logout, createChannelReq, sendFriendRequest}) => {
  
  const view = useAppSelector((state)=> state.views.view);
  const channels = useAppSelector((state)=>state.channels.channels);
  const selectedServer = useAppSelector((state)=>state.servers.selectedServer);


  return (
    <div className='border-end border-3 d-flex flex-column' id='channelList'>
      {
        view === Views.SERVERS ?
          <ServerInfo deleteServerReq={deleteServerReq} renameServerReq={renameServerReq} editChannelsReq={editChannelsReq}/>
          : view === Views.FRIENDS ? 
            <AddFriendButton sendFriendRequest={sendFriendRequest}/>
            : null
      }

      <div className='d-flex flex-column flex-grow-1' id='channelContainer'>
        {channels && view === Views.SERVERS ?
          channels.map((channel) => {
            return (<Channel key={channel.id} channelID={channel.id} title={channel.title}/>);
          })
          : view === Views.FRIENDS ? 
            <FriendList/>
            : null
        }

        {selectedServer && view === Views.SERVERS? 
          <ChannelAddButton createChannelReq={createChannelReq}
          />
        
          : null
        }

        {view === Views.FRIENDS}
      </div>

      <UserInfo logout={logout}/>

    </div>
  )
}

export default ChannelList