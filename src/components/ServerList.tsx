import React from 'react'
import { IServer } from '../models';
import { useAppSelector } from '../store/store';
import ServerTile from './ServerTile';
import ServerAddButton from './ServerAddButton';
import './styles.css';

interface Props {
  createServerReq: (title:string)=>void;
  getChannels: (id:string)=>void;
}

const ServerList: React.FC<Props> = ({createServerReq, getChannels}) => {

  const servers = useAppSelector((state)=>state.servers.servers);

  return (
    <div className='border-end border-3 d-flex flex-column gap-2 pt-2' id='serverList'>
      {servers? 
        servers.map((server:any)=>{
          return <ServerTile key={server.id} server={server} getChannels={getChannels}/>
        })
      : null}
      <ServerAddButton createServerReq={createServerReq}/>
    </div>
  )
}

export default ServerList