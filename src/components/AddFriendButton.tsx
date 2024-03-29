import _ from 'passport-local-mongoose';
import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { IconContext } from 'react-icons'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import './styles.css';

interface Props {
    sendFriendRequest: (recipient: string, callback: (message: string, isSuccess: boolean) => void)=>void;
  }

const AddFriendButton:React.FC<Props> = ({sendFriendRequest}) => {

    const [show, setShow] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [variant, setVariant] = useState<string>('');
    const [friend, setFriend] = useState<string>('');

    const flashMessage = (message: string, isSuccess: boolean) => {
        if (isSuccess) {
            setVariant('success');
            setFriend('');
        }
        else setVariant('danger');

        setError(message);
        setTimeout(()=> {
            setError('');
        }, 3000);
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        setShow(true);
        setFriend('');
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendFriendRequest(friend, flashMessage);
    }

    return (
        <>
            <div id='serverInfo' className='d-flex justify-content-between border-bottom border-3'>
                <h6 className='text-muted p-2 m-0'>Friends</h6>
                <div id='add-friend-btn'>
                    <Button variant='outline-secondary borderless' onClick={handleShow}>
                        <IconContext.Provider value={{ className: "react-icons mb-1", style: { verticalAlign: 'middle' } }}>
                            <BsFillPersonPlusFill />
                        </IconContext.Provider>
                    </Button>
                </div>
            </div>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a friend</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e)=>handleSubmit(e)}>
                    <Modal.Body>
                        <Alert variant={variant} show={!!error}>{error}</Alert>
                        <Form.Control type='text' placeholder="friend's username" autoFocus value={friend} onChange={e => setFriend(e.target.value)} />
                    </Modal.Body>
                </Form >
            </Modal>
        </>
    )
}

export default AddFriendButton