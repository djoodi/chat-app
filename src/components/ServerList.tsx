import React from 'react'
import { ServerInfo } from '../models';
import Server from './Server';
import ServerAddButton from './ServerAddButton';
import './styles.css';

interface Props {
  serverTitle: string;
  setServerTitle: React.Dispatch<React.SetStateAction<string>>;
  createServer: (e:React.MouseEvent<HTMLButtonElement>) => void;
  servers: any;
  setSelectedServer: React.Dispatch<React.SetStateAction<ServerInfo>>;
}

const ServerList: React.FC<Props> = ({serverTitle, setServerTitle, createServer, servers, setSelectedServer}) => {
  return (
    <div className='border-end border-3 d-flex flex-column gap-2 pt-2' id='serverList'>
      {servers? 
        servers.map((server:any)=>{
          return <Server key={server._id} server={server} setSelectedServer={setSelectedServer}/>
        })
      : null}
      <ServerAddButton serverTitle={serverTitle} setServerTitle={setServerTitle} createServer={createServer}/>
    </div>
  )
}

export default ServerList