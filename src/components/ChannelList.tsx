import React from 'react'
import Channel from './Channel';
import './styles.css';
import UserInfo from './UserInfo';

const ChannelList = () => {
  return (
    <div className='border-end border-3 d-flex flex-column' id='channelList'>
      <h6 className='text-muted border-bottom border-3 p-2 m-0'>Server Title</h6>
      <div className='d-flex flex-column flex-grow-1' id='channelContainer'>
        {}
      </div>
      <UserInfo/>
    </div>
  )
}

export default ChannelList