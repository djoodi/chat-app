import React from 'react'
import { IServer } from '../models';
import { setSelectedServer } from '../store/serversSlice';
import { useAppDispatch } from '../store/store';
import { setView } from '../store/viewsSlice';
import * as Views from '../views';

interface Props {
  server: IServer
  getChannels: (id: string)=>void;
}

const ServerTile: React.FC<Props> = ({server, getChannels}) => {

  const dispatch = useAppDispatch();

  const handleSelectServer = () => {
    dispatch(setSelectedServer({id: server.id}));
    dispatch(setView(Views.SERVERS));
    getChannels(server.id);
  }

  return (
    <div className='serverIcon bg-warning mx-auto rounded flex-shrink-0' onClick={handleSelectServer}>
        <h2 className='text-center text-uppercase align-middle h-100 mt-1 mb-0'>{server.title?.slice(0,2)}</h2>
    </div>
  )
}

export default ServerTile