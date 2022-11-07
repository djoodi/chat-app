import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { BsGear } from 'react-icons/bs';
import { useAppSelector } from '../store/store';

interface Props {
    deleteFriend: (id: string) => void;
}

const FriendTitle:React.FC<Props> = ({deleteFriend}) => {

    const selectedFriend = useAppSelector((state) => state.user.selectedFriend);

    const handleRemoveFriend = () => {
        deleteFriend(selectedFriend.id);
    }

    return (
        <div className='d-flex justify-content-between'>
            <h6 className='text-muted p-2 m-0' id='message-panel-title'>
                {selectedFriend.username}
            </h6>
            <div>
                <Dropdown align='end'>
                    <Dropdown.Toggle variant="outline-secondary borderless">
                        <IconContext.Provider value={{ className: "react-icons mb-1" }}>
                            <BsGear />
                        </IconContext.Provider>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {/* <Dropdown.Item onClick={() => {}}></Dropdown.Item>
                        <Dropdown.Item onClick={() => {}}></Dropdown.Item> */}
                        <Dropdown.Item className='text-danger' onClick={handleRemoveFriend}>Remove Friend</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default FriendTitle