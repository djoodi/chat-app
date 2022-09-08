import React, { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useAppSelector } from '../store/store';

interface Props {
    showRenameModal: boolean;
    closeRename: ()=>void;
    renameServerReq: (title:string)=>void;
}

const ServerModalRename: React.FC<Props> = ({showRenameModal, closeRename, renameServerReq}) => {

    
    const selectedServerID = useAppSelector((state)=>state.servers.selectedServer.id);
    const [serverTitle, setServerTitle] = useState<string>('');
    const [error, setError] = useState<string>('');
    
    const handleRenameServer = () => {
    
        const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    
        if (format.test(serverTitle)) {
          setError("You can't use special symbols in a server title!");
          return;
        }
    
        renameServerReq(serverTitle);
        handleClose();
    }
    
    const handleClose = () => {
        closeRename();
        setError('');
        setServerTitle('');
    }

    return (
        <Modal centered show={showRenameModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Rename server</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant='danger' show={!!error}>{error}</Alert>
                <Form>
                    <Form.Control type='text' placeholder='new server title' autoFocus value={serverTitle} onChange={e => setServerTitle(e.target.value)} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleRenameServer}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ServerModalRename