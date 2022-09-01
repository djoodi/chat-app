import React, { useEffect } from 'react'
import Axios from 'axios';
import ServerList from './components/ServerList';
import ChannelList from './components/ChannelList';
import MessageInput from './components/MessageInput';
import MemberList from './components/MemberList';
import MessagePanel from './components/MessagePanel';
import { Row } from 'react-bootstrap';
import './components/styles.css';

const Main = () => {

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

  useEffect(() => {
    isLoggedIn();

    return () => {

    }
  }, [])


  return (
    <div id='main' className='vh-100 vw-100 d-flex flex-nowrap'>
      <ServerList />
      <ChannelList />
      <MessagePanel />
      <MemberList />
    </div>
  )
}

export default Main