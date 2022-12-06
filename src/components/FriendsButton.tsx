import React from 'react'
import { Button } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { FaUserFriends } from 'react-icons/fa'
import { useAppDispatch } from '../store/store'
import { setView } from '../store/viewsSlice'
import * as Views from '../views'

interface Props {
    getUser: ()=>void;
}

const FriendsButton:React.FC<Props> = ({getUser}) => {

    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setView(Views.FRIENDS));
        getUser();
    }

    return (
        <Button variant='secondary' className='serverIcon mx-auto rounded flex-shrink-0 shadow-none' onClick={handleClick}>
            <IconContext.Provider value={{ className: 'friend-icon', style: { verticalAlign: 'middle' }}}>
                <div>
                    <FaUserFriends />
                </div>
            </IconContext.Provider>
        </Button>
    )
}

export default FriendsButton