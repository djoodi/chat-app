import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import './styles.css';

const MessageInput = () => {
  return (
    <div className='border-top border-3' id='messageInput'>
      <Form className='h-100'>
        <InputGroup className='h-100'>
          <Form.Control type='text' className='border-0 rounded-0 shadow-none' placeholder='message #channel-title'/>
          <Button type='submit' className='rounded-0'>Enter</Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default MessageInput