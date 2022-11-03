import React from 'react'
import { IconContext } from 'react-icons'
import {FiMail} from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '../store/store';
import { setView } from '../store/viewsSlice';
import * as Views from '../views';
import Friend from './Friend';

const FriendList = () => {

  const friendRequests = useAppSelector((state)=>state.user.friendRequests);
  const friends = useAppSelector((state)=>state.user.friends);
  const dispatch = useAppDispatch();

  const handleClickFriendRequests = () => {
    dispatch(setView(Views.REQUESTS));
  }

  return (
    <div>
      <div className='border-bottom border-1 p-2 hoverable' onClick={handleClickFriendRequests}>
        <div className='d-flex'>
          <IconContext.Provider value={{ className: "text-muted react-icons mt-1", style: { verticalAlign: 'middle' } }}>
            <FiMail/>
          </IconContext.Provider>
          <p className='mb-0 text-muted ms-2'>Friend Requests</p>
          <p className='mb-0 text-muted ms-auto'>{friendRequests.length}</p>
        </div>
      </div>
      {
        friends.map(x => {
          return <Friend key={x.id} friend={x}/>
        })
      }
    </div>
  )
}

export default FriendList