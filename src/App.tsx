import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';
import {io} from 'socket.io-client';

const socket = io('http://localhost:4000', {
  withCredentials: true,
  autoConnect: false
});

function App() {

  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  const [registerUsername, setRegisterUsername] = useState<string>("");
  const [loginUsername, setLoginUsername] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [serverTitle, setServerTitle] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);
  const [servers, setServers] = useState<any>(null);
  const [server, setServer] = useState<any>(null);
  const [channel, setChannel] = useState<any>(null);
  const [socketID, setSocketID] = useState<string>('');
  const [username, setUsername] = useState<string>('');
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
    }).then((res)=>{
      getUser();
      console.log(res);
    });
  };

  const getUser = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/user'
    }).then((res) => setUserData(res.data));
  };

  const logout = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/logout'
    }).then((res) => console.log(res));
  };

  const createServer = () => {
    Axios({
      method: 'POST',
      data: {
        title: serverTitle,
        id: userData._id
      },
      withCredentials: true,
      url: 'http://localhost:4000/servers/create'
    }).then((res) => {
      console.log(res);
      setServerTitle('');
    });
  }

  const getServers = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/servers/index'
    }).then((res) => {
      console.log(res);
      setServers(res.data);
    })
  }

  const connectToSocket = () => {
    socket.connect();
  }

  const sendMessage = () => {
    socket.emit("message", {message, serverID: server._id});
    setMessage('');
  }

  const getSocketInfo = () => {
    socket.emit('whoami', (username: string)=> {
      setUsername(username);
    })
  }

  useEffect(() => {

    socket.on('connect', ()=> {
      setSocketID(socket.id);
      
      getSocketInfo();

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
        <h3>Register</h3>
        <input type="text" placeholder="username" onChange={e => setRegisterUsername(e.target.value)}/>
        <input type="password" placeholder="password" onChange={e => setRegisterPassword(e.target.value)}/>
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h3>Login</h3>
        <input type="text" placeholder="username" onChange={e => setLoginUsername(e.target.value)}/>
        <input type="password" placeholder="password" onChange={e => setLoginPassword(e.target.value)}/>
        <button onClick={login}>Submit</button>
      </div>

      <div>
        {
          userData? 
            <div>
              <h3>Welcome Back {userData.username}</h3>
              <p>User ID: {userData._id}</p>
            </div>
            : null
        }
      </div>

      <div>
        <h3>Logout</h3>
        <button onClick={logout}>Submit</button>
      </div>

      <p>{}</p>

      <h1>Socket stuff</h1>

      <button onClick={connectToSocket}>Connect</button>

      <p>Socket ID: {socketID}</p>
      <p>Username: {username}</p>


      <div>
        <h3>Create a server</h3>
        <input type="text" placeholder='server name' onChange={e => setServerTitle(e.target.value)} value={serverTitle}/>
        <button onClick={createServer}>Create</button>
      </div>

      <div>
        <h3>Your Servers</h3>
        <button onClick={getServers}>Get servers</button>
        <p></p>
        {servers? 
          servers.map((server:any) => {
            return(<div key={server._id}><button value={server._id} onClick={()=>setServer(server)}>{server.title}</button></div>)
          })
            : null
        }
      </div>
      
      {server?
        <div>
          <h3>Send a message to <b>{server.title}</b></h3>
          <input type="text" placeholder="send a message" onChange={e=> setMessage(e.target.value)} value={message}/>
          <button onClick={sendMessage}>Send</button>
        </div>
        :null
      }

    </div>
  );
}

export default App;
