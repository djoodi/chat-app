import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import './App.css';
import Axios from 'axios';
import { io } from 'socket.io-client';
import Login from './components/Login';
import Register from './components/Register';
import { IAuth } from './models';
import { Alert, Button, Card, Col, Container, Nav, Row } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from './store/store';

const socket = io('http://localhost:4000', {
  withCredentials: true,
  autoConnect: false
});

function App() {

  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [server, setServer] = useState<any>(null);
  const [socketID, setSocketID] = useState<string>('');


  const [activeTab, setActiveTab] = useState<string>('login');
  const [authInput, setAuthInput] = useState<IAuth>({ username: "", password: "" });

  const [error, setError] = useState<string>('');
  const [validated, setValidated] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);

  const flashError = (message: string) => {
    setError(message);
    setShow(true);

    setTimeout(() => { 
      setShow(false);
    }, 3000);
  }

  const register = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    if (!authInput.username || !authInput.password) return;

    Axios({
      method: "POST",
      data: {
        username: authInput.username,
        password: authInput.password
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => {
      setValidated(false);
      setAuthInput({ username: "", password: "" });
      console.log(res);
      if (res.data === true) {
        window.location.href = '/app'
      } else { // error
        flashError(res.data);
      }
    });
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    if (!authInput.username || !authInput.password) return;

    Axios({
      method: 'POST',
      data: {
        username: authInput.username,
        password: authInput.password
      },
      withCredentials: true,
      url: 'http://localhost:4000/login'
    }).then((res) => {
      setValidated(false);
      //getUser();
      setAuthInput({ username: "", password: "" });
      console.log(res);
      if (res.data === true) {
        window.location.href = '/app'
      } else { // error
        flashError(res.data);
      }
    });
  };

  const connectToSocket = () => {
    socket.connect();
  }

  const sendMessage = () => {
    socket.emit("message", { message, serverID: server._id });
    setMessage('');
  }

  // const getSocketInfo = () => {
  //   socket.emit('whoami', (username: string) => {
  //     setUsername(username);
  //   })
  // }

  useEffect(() => {

    socket.on('connect', () => {
      setSocketID(socket.id);

      // getSocketInfo();

      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    }
  }, [])


  return (
    <main className="App">
      <Container className='vh-100 d-flex flex-column justify-content-center align-items-center'>
        <Row className="col-xxl-4 col-xl-4 col-lg-6 col-md-8 col-sm-10 col-xs-12">
          <h1 className='text-center'>Chat-App</h1>
          <Card className='px-0'>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#login">
                <Nav.Item>
                  <Nav.Link href="#login" onClick={() => { setActiveTab('login'); setAuthInput({ username: '', password: '' }); setValidated(false) }}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#register" onClick={() => { setActiveTab('register'); setAuthInput({ username: '', password: '' }); setValidated(false) }}>Register</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>{activeTab === 'login' ? 'Login' : 'Register'}</Card.Title>
              {
                activeTab === 'login' ?
                  <Login authInput={authInput} setAuthInput={setAuthInput} handleSubmit={login} validated={validated} />
                  : <Register authInput={authInput} setAuthInput={setAuthInput} handleSubmit={register} validated={validated} />
              }
            </Card.Body>
          </Card>
        </Row>
        <Row style={{ height: '90px' }}>
          <Alert variant='danger' className='mt-3' show={show} onClose={()=>setShow(false)}>
            <p className='m-0'>{error}</p>
          </Alert>
        </Row>
      </Container>

    </main>
  );
}

export default App;
