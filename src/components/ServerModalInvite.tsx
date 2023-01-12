import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import InviteFriend from './InviteFriend'

interface Props {
    showInviteFriendModal: boolean;
    closeInviteFriendModal: () => void;
}

const ServerModalInvite:React.FC<Props> = ({showInviteFriendModal, closeInviteFriendModal}) => {
  return (
    <Modal centered show={showInviteFriendModal} onHide={closeInviteFriendModal}>
    <Modal.Header closeButton>
        <Modal.Title>Invite Friends</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {
                    <InviteFriend/>
        }
    </Modal.Body>
</Modal>
  )
}

export default ServerModalInvite