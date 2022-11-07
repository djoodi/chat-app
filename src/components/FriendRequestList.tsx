import React, { useEffect } from 'react'
import { useAppSelector } from '../store/store'
import FriendRequest from './FriendRequest';

interface Props {
    acceptFriendRequest: (id: string) => void;
    declineFriendRequest: (id: string) => void;
}

const FriendRequestList: React.FC<Props> = ({acceptFriendRequest,declineFriendRequest}) => {

    const friendRequests = useAppSelector((state) => state.user.friendRequests);

    // useEffect(() => {
    //     return () => {
    //     }
    //   }, [friendRequests])

    return (
        <div>
            {
                friendRequests?.map(request => {
                    return <FriendRequest key={request.id} requester={request} acceptFriendRequest={acceptFriendRequest} declineFriendRequest={declineFriendRequest}/>
                })
            }
        </div>
    )
}

export default FriendRequestList