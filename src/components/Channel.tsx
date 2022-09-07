import React from 'react'

interface Props {
  title: string;
  setSelectedChannel: React.Dispatch<React.SetStateAction<any>>;
  channelID: string;
}

const Channel: React.FC<Props> = ({title, setSelectedChannel, channelID}) => {
  return (
    <div className='channel border-bottom border-1 p-2' onClick={(e) => setSelectedChannel({id: channelID, title})}>
        <p className='mb-0 text-muted'>{title}</p>
    </div>
  )
}

export default Channel