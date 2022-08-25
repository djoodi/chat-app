import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import InputBox from './components/InputBox';
import { Message } from './models';

const App: React.FC = () => {

  const [apiResponse, setApiResponse] = useState<unknown>('');

  const [message, setMessage] = useState<string>("")

  const [chatLog, setChatLog] = useState<Message[]>([])
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      setChatLog([...chatLog, {id: Date.now().toString(), username: "Judie", message}])
    }
    setMessage('');
  }  

  return (
    <div>
      <InputBox 
        message={message}
        setMessage={setMessage}
        handleChat={handleSendMessage}/>
    </div>
  );
}

export default App;
