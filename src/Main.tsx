import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import ServerList from './components/ServerList';
import ChannelList from './components/ChannelList';
import MessageInput from './components/MessageInput';
import MemberList from './components/MemberList';
import MessagePanel from './components/MessagePanel';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import ServerAddButton from './components/ServerAddButton';
import './components/styles.css';

const Main = () => {

  const [userData, setUserData] = useState<any>(null);
  const [servers, setServers] = useState<any>(null);
  const [serverTitle, setServerTitle] = useState<string>('');
  const [channel, setChannel] = useState<any>(null);

  const isLoggedIn = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/app'
    }).then((res) => {
      console.log(res);
      if (res.data === false) {
        window.location.href = '/';
      }
    })
  }

  const getUser = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/user'
    }).then((res) => setUserData(res.data));
  };

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

  const createServer = (e:React.MouseEvent<HTMLButtonElement>) => {
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
      setServers([...servers, res.data]);
    });
  }

  useEffect(() => {
    isLoggedIn();
    getUser();
    getServers();

    return () => {

    }
  }, [])

  return (
    <div>
      <div id='main' className='d-flex vh-100'>
        <ServerList createServer={createServer} serverTitle={serverTitle} setServerTitle={setServerTitle} servers={servers}/>
        <ChannelList />
        <MessagePanel />
        <MemberList />
      </div>
    </div>
  )
}

export default Main