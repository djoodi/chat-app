import React from 'react'
import { ServerInfo } from '../models';

interface Props {
  server: any
  setSelectedServer: React.Dispatch<React.SetStateAction<ServerInfo>>;
}

const Server: React.FC<Props> = ({server, setSelectedServer}) => {
  return (
    <div className='serverIcon bg-warning mx-auto rounded flex-shrink-0' onClick={()=>setSelectedServer({id: server._id, title: server.title})}>
        <h2 className='text-center text-uppercase align-middle h-100 mt-1 mb-0'>{server.title.slice(0,2)}</h2>
    </div>
  )
}

export default Server