import React, { useState } from 'react'
import { Button, Form, Modal, Alert, InputGroup } from 'react-bootstrap';
import { useAppSelector } from '../store/store';

interface Props {
  createChannelReq: (title:string)=>void;
}

const ChannelAddButton: React.FC<Props> = ({createChannelReq}) => {

  const channels = useAppSelector((state)=>state.channels.channels);

  const [channelTitle, setChannelTitle] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    setError('')
    setChannelTitle('');
    setShow(true);
  }

  const handleCreateChannel = () => {

    // check if a channel with the same name already exists
    const match = channels.findIndex(channel => channel.title === `#${channelTitle}`);
    console.log(match);
    console.log(channels);
    if (match !== -1) {
      setError('A channel with that name already exists in this server!');
      return;
    }

    const format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(channelTitle)) {
      setError("You can't use special symbols in a channel title!");
      return;
    }

    createChannelReq(channelTitle); 
    handleClose();
    setChannelTitle('');
    setError('');
  }

  return (
    <>
      <div className='channel border-bottom border-1 p-2' onClick={()=>handleShow()}>
        <p className='mb-0 text-muted'>&#43; Add Channel</p>
      </div>

      <Modal centered show={show} onHide={()=>{handleClose(); }}>
        <Modal.Header closeButton>
          <Modal.Title>Create a channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant='danger' show={!!error}>{error}</Alert>
          
          <Form>
            <InputGroup>
              <InputGroup.Text>#</InputGroup.Text>
              <Form.Control type='text' placeholder='server title' autoFocus value={channelTitle} onChange={e => {setChannelTitle(e.target.value)}} />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex flex-row'>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateChannel}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ChannelAddButton