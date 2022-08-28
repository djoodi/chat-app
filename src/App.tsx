import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import {io} from 'socket.io-client';

// const socket = io('http://localhost:4000',{
//   withCredentials: true,
//   extraHeaders: {
//     "chat-app-socket": "1234",
//     "Access-Control-Allow-Origin": "true"
//   }
// });

function App() {

  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [data, setData] = useState<any>(null)

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
  }

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

    </div>
  );
}

export default App;
