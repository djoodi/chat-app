import React, { useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'

interface Props {
    serverTitle: string;
    setServerTitle: React.Dispatch<React.SetStateAction<string>>;
    createServer: (e:React.MouseEvent<HTMLButtonElement>) => void;
}

const ServerAddButton: React.FC<Props> = ({serverTitle, setServerTitle, createServer}) => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant='secondary' className='serverIcon mx-auto rounded flex-shrink-0 shadow-none' onClick={handleShow}>
                <h2 className='text-light text-center h-100 mt-0'>&#43;</h2>
            </Button>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a server</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control type='text' placeholder='server title' autoFocus value={serverTitle} onChange={e=>setServerTitle(e.target.value)}/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e)=>{createServer(e); handleClose()}}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ServerAddButton