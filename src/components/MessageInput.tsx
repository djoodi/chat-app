import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap';
import * as Views from '../views';
import './styles.css';
import { useAppSelector } from '../store/store';

interface Props {
  sendMessage: (message: string) => void;
}

const MessageInput:React.FC<Props> = ({sendMessage}) => {

  const [message, setMessage] = useState<string>('');
  const view = useAppSelector((state)=> state.views.view);
  

  const handleSendMessage = (e:React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  const getPlaceholder = () => {
    switch(view) {
      case Views.FRIENDS:
        return 'send a direct message';
      case Views.SERVERS:
        return 'message #CHANNEL-TITLE';
    }
  };

  return (
    <div className='border-top border-3 mt-auto' id='messageInput'>
      <Form className='h-100' onSubmit={(e)=>{handleSendMessage(e)}}>
        <InputGroup className='h-100'>
          <Form.Control type='text' className='border-0 rounded-0 shadow-none' placeholder={getPlaceholder()} value={message} onChange={(e)=>setMessage(e.target.value)}/>
          <Button type='submit' className='rounded-0'>Enter</Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default MessageInput