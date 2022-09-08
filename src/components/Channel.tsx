import React from 'react'
import { setSelectedChannel } from '../store/channelsSlice';
import { useAppDispatch } from '../store/store';

interface Props {
  title: string;
  channelID: string;
}

const Channel: React.FC<Props> = ({title, channelID}) => {

  const dispatch = useAppDispatch();

  return (
    <div className='channel border-bottom border-1 p-2' onClick={(e) => {dispatch(setSelectedChannel(channelID))}}>
        <p className='mb-0 text-muted'>{title}</p>
    </div>
  )
}

export default Channel