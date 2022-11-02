import React from 'react'
import { IconContext } from 'react-icons'
import {BsBellFill} from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../store/store';
import { setView } from '../store/viewsSlice';
import * as Views from '../views';

const FriendList = () => {

  const user = useAppSelector((state)=>state.user);
  const dispatch = useAppDispatch();

  const handleClickFriendRequests = () => {
    dispatch(setView(Views.REQUESTS));
  }

  return (
    <div>
      <div className='border-bottom border-1 p-2 hoverable' onClick={handleClickFriendRequests}>
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