import React from 'react'
import Channel from './Channel';
import ServerInfo from './ServerInfo';
import './styles.css';
import UserInfo from './UserInfo';

interface Props {
  selectedServerTitle:string;
  deleteServer: ()=>void;
  serverTitle: string;
  setServerTitle: React.Dispatch<React.SetStateAction<string>>;
  renameServer: ()=>void;
}

const ChannelList: React.FC<Props> = ({selectedServerTitle, deleteServer, serverTitle, setServerTitle, renameServer}) => {
  return (
    <div className='border-end border-3 d-flex flex-column' id='channelList'>
      <ServerInfo selectedServerTitle={selectedServerTitle} deleteServer={deleteServer} serverTitle={serverTitle} setServerTitle={setServerTitle} renameServer={renameServer}/>
      <div className='d-flex flex-column flex-grow-1' id='channelContainer'>
        {}
      </div>
      <UserInfo/>
    </div>
  )
}

export default ChannelList