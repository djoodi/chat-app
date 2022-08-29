import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import {io} from 'socket.io-client';

const socket = io('http://localhost:4000', {
  withCredentials: true,
});

function App() {

  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [data, setData] = useState<any>(null)
  const [message, setMessage] = useState<string>("")

  const register = () => {
    Axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: 'http://localhost:4000/register'
    }).then((res) => console.log(res));
  };

  const login = () => {
    Axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: 'http://localhost:4000/login'
    }).then((res) => console.log(res));
  };

  const getUser = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/user'
    }).then((res) => setData(res.data));
  };

  const logout = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/logout'
    }).then((res) => console.log(res));
  };

  const sendMessage = () => {
    socket.emit("message", message);
  }

  useEffect(() => {
    socket.on('connect', ()=> {
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
      
      <div>
        <h1>Register</h1>
        <input type="text" placeholder="username" onChange={e => setRegisterUsername(e.target.value)}/>
        <input type="password" placeholder="password" onChange={e => setRegisterPassword(e.target.value)}/>
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input type="text" placeholder="username" onChange={e => setLoginUsername(e.target.value)}/>
        <input type="password" placeholder="password" onChange={e => setLoginPassword(e.target.value)}/>
        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {
          data? <h1>Welcome Back {data.username}</h1> : null
        }
      </div>

      <div>
        <h1>Logout</h1>
        <button onClick={logout}>Submit</button>
      </div>

      <p>{}</p>

      <div>
        <h3>Create message</h3>
        <input type="text" placeholder="send a message" onChange={e=> setMessage(e.target.value)}/>
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}

export default App;
