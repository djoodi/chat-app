import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

interface Props {
  channelTitle: string;
  setChannelTitle: React.Dispatch<React.SetStateAction<string>>;
  createChannel: () => void;
}

const ChannelAddButton: React.FC<Props> = ({channelTitle, setChannelTitle, createChannel}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='channel border-bottom border-1 p-2' onClick={()=>handleShow()}>
        <p className='mb-0 text-muted'>&#43; Add Channel</p>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control type='text' placeholder='server title' autoFocus value={channelTitle} onChange={e => setChannelTitle(e.target.value)} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => { createChannel(); handleClose() }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ChannelAddButton