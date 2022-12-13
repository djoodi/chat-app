import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import './styles.css';

interface Props {
  sendMessage: (message: string) => void;
}

const MessageInput:React.FC<Props> = ({sendMessage}) => {

  const [message, setMessage] = useState<string>('');

  const handleSendMessage = (e:React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <div className='border-top border-3 mt-auto' id='messageInput'>
      <Form className='h-100' onSubmit={(e)=>{handleSendMessage(e)}}>
        <InputGroup className='h-100'>
          <Form.Control type='text' className='border-0 rounded-0 shadow-none' placeholder='message #channel-title' value={message} onChange={(e)=>setMessage(e.target.value)}/>
          <Button type='submit' className='rounded-0'>Enter</Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default MessageInput