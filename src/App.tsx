import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom/client";
import './App.css';
import Axios from 'axios';
import { io } from 'socket.io-client';
import Login from './components/Login';
import Register from './components/Register';
import { AuthInfo } from './models';
import { Button, Card, Col, Container, Nav, Row } from 'react-bootstrap';

const socket = io('http://localhost:4000', {
  withCredentials: true,
  autoConnect: false
});

function App() {

  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const [activeTab, setActiveTab] = useState<string>('login');
  const [authInput, setAuthInput] = useState<AuthInfo>({ username: "", password: "" });

  const [server, setServer] = useState<any>(null);

  const [socketID, setSocketID] = useState<string>('');

  const [message, setMessage] = useState<string>('');

  const register = (e: React.FormEvent) => {
    e.preventDefault();
    Axios({
      method: "POST",
      data: {
        username: authInput.username,
        password: authInput.password
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => {
      setAuthInput({ username: "", password: "" });
      console.log(res);
      if (res.data === true) {
        window.location.href = '/app'
      }
    });
  };

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    Axios({
      method: 'POST',
      data: {
        username: authInput.username,
        password: authInput.password
      },
      withCredentials: true,
      url: 'http://localhost:4000/login'
    }).then((res) => {
      //getUser();
      setAuthInput({ username: "", password: "" });
      console.log(res);
      if (res.data === true) {
        window.location.href = '/app'
      }
    });
  };

  const logout = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/logout'
    }).then((res) => console.log(res));
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
    <div className="App">
      <Container className='vh-100 d-flex justify-content-center align-items-center'>
        <Row className="col-xxl-4 col-xl-4 col-lg-6 col-md-8 col-sm-10 col-xs-12">
          <h1 className='text-center'>Chat-App</h1>
          <Card className='px-0'>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#login">
                <Nav.Item>
                  <Nav.Link href="#login" onClick={() => setActiveTab('login')}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#register" onClick={() => setActiveTab('register')}>Register</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>{activeTab === 'login' ? 'Login' : 'Register'}</Card.Title>
              {
                activeTab === 'login' ?
                  <Login authInput={authInput} setAuthInput={setAuthInput} handleSubmit={login} />
                  : <Register authInput={authInput} setAuthInput={setAuthInput} handleSubmit={register} />
              }
            </Card.Body>
          </Card>
        </Row>
      </Container>

    </div>
  );
}

export default App;
