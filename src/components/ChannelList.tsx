import React from 'react'
import { IChannel } from '../models';
import ChannelAddButton from './ChannelAddButton';
import Channel from './Channel';
import ServerInfo from './ServerInfo';
import './styles.css';
import UserInfo from './UserInfo';
import { useAppSelector } from '../store/store';

interface Props {
  deleteServerReq: (arg:string)=>void;
  renameServerReq: (title:string)=>void;
  editChannelsReq: (channels: IChannel[])=>void;
  logout: ()=>void;
  createChannelReq: (title:string)=>void;
}

const ChannelList: React.FC<Props> = ({ deleteServerReq, renameServerReq, editChannelsReq, logout, createChannelReq}) => {

  const channels = useAppSelector((state)=>state.channels.channels);
  const selectedServer = useAppSelector((state)=>state.servers.selectedServer);

  return (
    <div className='border-end border-3 d-flex flex-column' id='channelList'>
      <ServerInfo deleteServerReq={deleteServerReq} renameServerReq={renameServerReq} editChannelsReq={editChannelsReq}/>

      <div className='d-flex flex-column flex-grow-1' id='channelContainer'>
        {channels ?
          channels.map((channel) => {
            return (<Channel key={channel.id} channelID={channel.id} title={channel.title}/>);
          })
          : null
        }
        {selectedServer? 
          <ChannelAddButton createChannelReq={createChannelReq}
          />
        
          : null
        }
      </div>

      <UserInfo logout={logout}/>

    </div>
  )
}

export default ChannelList