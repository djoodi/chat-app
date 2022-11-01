import React from 'react'
import { Button } from 'react-bootstrap';
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
    <Button variant='warning' className='serverIcon hoverable mx-auto rounded flex-shrink-0 shadow-none p-0' onClick={handleSelectServer}>
        <h2 className='text-center text-uppercase align-middle h-100 m-auto mt-1'>{server.title?.slice(0,2)}</h2>
    </Button>
  )
}

export default ServerTile