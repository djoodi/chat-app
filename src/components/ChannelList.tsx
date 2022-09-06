import React from 'react'
import { ChannelInfo } from '../models';
import ChannelAddButton from './ChannelAddButton';
import Channel from './Channel';
import ServerInfo from './ServerInfo';
import './styles.css';
import UserInfo from './UserInfo';

interface Props {
  selectedServerTitle: string;
  deleteServer: () => void;
  serverTitle: string;
  setServerTitle: React.Dispatch<React.SetStateAction<string>>;
  renameServer: () => void;
  logout: () => void;
  username: string;
  channels: ChannelInfo[];
  channelTitle: string;
  setChannelTitle: React.Dispatch<React.SetStateAction<string>>;
  createChannel: () => void;
}

const ChannelList: React.FC<Props> = (
  { selectedServerTitle,
    deleteServer,
    serverTitle,
    setServerTitle,
    renameServer,
    logout,
    username,
    channels,
    channelTitle,
    setChannelTitle,
    createChannel }) => {

  return (
    <div className='border-end border-3 d-flex flex-column' id='channelList'>
      <ServerInfo selectedServerTitle={selectedServerTitle} deleteServer={deleteServer} serverTitle={serverTitle} setServerTitle={setServerTitle} renameServer={renameServer} />
      <div className='d-flex flex-column flex-grow-1' id='channelContainer'>
        {channels ?
          channels.map((channel) => {
            return (<Channel key={channel.id} title={channel.title} />);
          })
          : null
        }
        {selectedServerTitle? 
          <ChannelAddButton 
            channelTitle={channelTitle}
            setChannelTitle={setChannelTitle}
            createChannel={createChannel}
            />
        
          : null
        }
      </div>
      <UserInfo logout={logout} username={username} />
    </div>
  )
}

export default ChannelList