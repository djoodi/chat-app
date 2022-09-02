import React, { useState } from 'react'
import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { IconContext } from 'react-icons'
import { BsGear } from 'react-icons/bs'

interface Props {
    selectedServerTitle: string;
    deleteServer: () => void;
    serverTitle: string;
    setServerTitle: React.Dispatch<React.SetStateAction<string>>;
    renameServer: ()=>void;
}

const ServerInfo: React.FC<Props> = ({ selectedServerTitle, deleteServer, serverTitle, setServerTitle, renameServer}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div id='serverInfo' className='d-flex justify-content-between border-bottom border-3'>
                <h6 className='text-muted p-2 m-0'>{selectedServerTitle}</h6>
                {selectedServerTitle ?
                    <div>
                        <Dropdown align='end'>
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-server">
                                <IconContext.Provider value={{ className: "react-icons mb-1" }}>
                                    <BsGear />
                                </IconContext.Provider>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={()=> {setServerTitle(selectedServerTitle); handleShow()}}>Rename Server</Dropdown.Item>
                                <Dropdown.Item className='text-danger' onClick={() => deleteServer()}>Delete Server</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    : null
                }
            </div >


            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Rename server</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control type='text' placeholder='new server title' autoFocus value={serverTitle} onChange={e => setServerTitle(e.target.value)} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { renameServer(); handleClose() }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ServerInfo