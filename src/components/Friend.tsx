import React from 'react'
import { IconContext } from 'react-icons';
import {BiRadioCircleMarked, BiRadioCircle} from 'react-icons/bi';
import {IoMdNotificationsOutline} from 'react-icons/io';
import { IFriend } from '../models';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setView } from '../store/viewsSlice';
import { setSelectedFriend } from '../store/userSlice';
import * as Views from '../views';

interface Props {
    friend: IFriend;
}

const Friend: React.FC<Props> = ({ friend }) => {

    const views = useAppSelector((state)=>state.views);
    const dispatch = useAppDispatch();

    const handleClick = () => {
        dispatch(setView(Views.DIRECT_MESSAGE));
        dispatch(setSelectedFriend(friend));
    }

    return (
        <div className="d-flex hoverable border-bottom border-1 p-2" onClick={handleClick}>
            {friend.isOnline? 
                <IconContext.Provider value={{ className:"text-primary mt-1 react-icons me-2", style: { verticalAlign: 'middle' }, size: '1em'}}>
                    <BiRadioCircleMarked />
                </IconContext.Provider>
                :
                <IconContext.Provider value={{ className:"text-muted mt-1 react-icons me-2", style: { verticalAlign: 'middle' }, size: '1em'}}>
                    <BiRadioCircle />
                </IconContext.Provider>
            }
            
            <p className="mb-0 text-muted">{friend.username}</p>
            <IconContext.Provider value={{ className: "text-muted react-icons mt-1 ms-auto", style: { verticalAlign: 'middle' }, size: '1.2em'}}>
                <IoMdNotificationsOutline />
            </IconContext.Provider>
        </div>
    )
}

export default Friend