import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useAppSelector } from '../store/store';

interface Props {
    showRenameModal: boolean;
    closeRename: ()=>void;
    renameServerReq: (title:string)=>void;
}

const ServerModalRename: React.FC<Props> = ({showRenameModal, closeRename, renameServerReq}) => {

    const selectedServerID = useAppSelector((state)=>state.servers.selectedServer.id);
    const [serverTitle, setServerTitle] = useState<string>('');

    return (
        <Modal centered show={showRenameModal} onHide={closeRename}>
            <Modal.Header closeButton>
                <Modal.Title>Rename server</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control type='text' placeholder='new server title' autoFocus value={serverTitle} onChange={e => setServerTitle(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeRename}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={() => {renameServerReq(serverTitle); closeRename() }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ServerModalRename