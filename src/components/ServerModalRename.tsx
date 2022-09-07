import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

interface Props {
    showRenameModal: boolean;
    closeRename: ()=>void;
    renameServer: ()=>void;
    serverTitle: string;
    setServerTitle: React.Dispatch<React.SetStateAction<string>>;
}

const ServerModalRename: React.FC<Props> = ({
    showRenameModal, 
    closeRename, 
    renameServer, 
    serverTitle, 
    setServerTitle}) => {
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
                <Button variant="primary" onClick={() => { renameServer(); closeRename() }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ServerModalRename