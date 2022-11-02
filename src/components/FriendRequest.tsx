import React from 'react'
import { IconContext } from 'react-icons';
import { IMember } from '../models';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

interface Props {
    requester: IMember;
}

const FriendRequest: React.FC<Props> = ({ requester }) => {
    return (
        <div className='d-flex p-2 gap-2 border-bottom'>
            <p className='mb-0 mt-1 ms-2 text-muted me-auto align-text-bottom'>{requester.username}</p>
            <Button variant='outline-success' className='borderless me-1'>
                <IconContext.Provider value={{ className: "react-icons", style: { verticalAlign: 'middle' }}}>
                    <BsCheckLg />
                </IconContext.Provider>
            </Button>
            <Button variant='outline-danger' className='borderless me-1'>
                <IconContext.Provider value={{ className: "react-icons", style: { verticalAlign: 'middle' }}}>
                    <BsXLg />
                </IconContext.Provider>
            </Button>
        </div>
    )
}

export default FriendRequest