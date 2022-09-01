import React from 'react'
import Server from './Server';
import ServerAddButton from './ServerAddButton';
import './styles.css';

interface Props {
  serverTitle: string;
  setServerTitle: React.Dispatch<React.SetStateAction<string>>;
  createServer: (e:React.MouseEvent<HTMLButtonElement>) => void;
  servers: any;
}

const ServerList: React.FC<Props> = ({serverTitle, setServerTitle, createServer, servers}) => {
  return (
    <div className='border-end border-3 d-flex flex-column gap-2 pt-2' id='serverList'>
      {servers? 
        servers.map((server:any)=>{
          return <Server server={server}/>
        })
      : null}
      <ServerAddButton serverTitle={serverTitle} setServerTitle={setServerTitle} createServer={createServer}/>


    </div>
  )
}

export default ServerList