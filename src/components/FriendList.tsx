import React from 'react'
import { IconContext } from 'react-icons'
import {BsBellFill} from 'react-icons/bs'
import { useAppSelector } from '../store/store';

const FriendList = () => {

  const user = useAppSelector((state)=>state.user);

  return (
    <div>
      <div className='border-bottom border-1 p-2 hoverable' onClick={(e) => {}}>
        <div className='d-flex'>
          <IconContext.Provider value={{ className: "text-muted react-icons mt-1", style: { verticalAlign: 'middle' } }}>
            <BsBellFill/>
          </IconContext.Provider>
          <p className='mb-0 text-muted ms-2'>Friend Requests</p>
          <p className='mb-0 text-muted ms-auto'>{user.friendRequests.length}</p>
        </div>
      </div>
    </div>
  )
}

export default FriendList