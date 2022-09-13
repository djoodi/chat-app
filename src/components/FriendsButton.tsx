import React from 'react'
import { IconContext } from 'react-icons'
import { FaUserFriends } from 'react-icons/fa'
import { useAppDispatch } from '../store/store'
import { setView } from '../store/viewsSlice'
import * as Views from '../views'

const FriendsButton = () => {

    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setView(Views.FRIENDS));
    }

    return (
        <div className='d-flex justify-content-center align-items-middle serverIcon bg-secondary mx-auto rounded flex-shrink-0' onClick={handleClick}>
            <IconContext.Provider value={{ className: 'friend-icon', style: { verticalAlign: 'middle' }}}>
                <div>
                    <FaUserFriends />
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default FriendsButton