import React from 'react'
import { IServer } from '../models';
import { useAppSelector } from '../store/store';
import ServerTile from './ServerTile';
import ServerAddButton from './ServerAddButton';
import './styles.css';
import FriendsButton from './FriendsButton';

interface Props {
  createServerReq: (title:string)=>void;
  getChannels: (id:string)=>void;
  getUser: () =>void;
}

const ServerList: React.FC<Props> = ({createServerReq, getChannels, getUser}) => {

  const servers = useAppSelector((state)=>state.servers.servers);

  return (
    <div className='border-end border-3 d-flex flex-column gap-2 pt-2' id='serverList'>
      <FriendsButton getUser={getUser}/>
      {servers? 
        servers.map((server:any)=>{
          return <ServerTile key={server.id} server={server} getChannels={getChannels}/>
        })
      : null}
      <ServerAddButton key={Date.now()} createServerReq={createServerReq}/>
    </div>
  )
}

export default ServerList