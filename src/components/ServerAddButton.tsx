import React, { useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { IconContext } from 'react-icons';
import {HiPlusSm} from 'react-icons/hi';

interface Props {
    createServerReq: (arg:string)=>void;
}

const ServerAddButton: React.FC<Props> = ({createServerReq}) => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setServerTitle('');
    }

    const [serverTitle, setServerTitle] = useState<string>('');

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        createServerReq(serverTitle);
        handleClose();
    }

    return (
        <>
            <Button variant='secondary' className='serverIcon mx-auto rounded flex-shrink-0 shadow-none' onClick={handleShow}>
                {/* <h2 className='text-light text-center h-100 text-align-center'>&#43;</h2> */}
                <IconContext.Provider value={{ className: "react-icons mb-1", style: { verticalAlign: 'middle' }}}>
                    <HiPlusSm/>
                </IconContext.Provider>
            </Button>

            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a server</Modal.Title>
                </Modal.Header>
                <Form onSubmit={e=>handleSubmit(e)}>
                    <Modal.Body>
                        <Form.Control type='text' placeholder='server title' autoFocus value={serverTitle} onChange={e=>setServerTitle(e.target.value)}/>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ServerAddButton