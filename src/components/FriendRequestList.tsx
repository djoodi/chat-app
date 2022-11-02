import React from 'react'
import { useAppSelector } from '../store/store'
import FriendRequest from './FriendRequest';

const FriendRequestList = () => {

    const friendRequests = useAppSelector((state) => state.user.friendRequests);

    return (
        <div>
            {
                friendRequests?.map(request => {
                    return <FriendRequest key={request.id} requester={request} />
                })
            }
        </div>
    )
}

export default FriendRequestList