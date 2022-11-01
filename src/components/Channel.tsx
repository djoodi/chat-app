import React from 'react'
import { setSelectedChannel } from '../store/channelsSlice';
import { useAppDispatch } from '../store/store';

interface Props {
  title: string;
  channelID: string;
}

const Channel: React.FC<Props> = ({title, channelID}) => {

  const dispatch = useAppDispatch();

  const displayTitle = () => {
    return title.replace(" ", "-");
  }

  return (
    <div key={channelID} className='hoverable border-bottom border-1 p-2' onClick={(e) => {dispatch(setSelectedChannel({id: channelID}))}}>
        <p className='mb-0 text-muted'>{displayTitle()}</p>
    </div>
  )
}

export default Channel