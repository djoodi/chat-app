import React, { useEffect, useRef, useState } from 'react'
import Axios from 'axios';
import ServerList from './components/ServerList';
import ChannelList from './components/ChannelList';
import MemberList from './components/MemberList';
import MessagePanel from './components/MessagePanel';
import './components/styles.css';
import { IServer, IChannel, IEditChannelAction } from './models';
import { useAppSelector, useAppDispatch } from './store/store'
import { clearUser, setUser } from './store/userSlice';
import { addServer, removeServer, renameServer, setSelectedServer, setServers } from './store/serversSlice';
import { addChannel, setSelectedChannel, setChannels } from './store/channelsSlice';

const Main = () => {

  const user = useAppSelector((state)=>state.user);
  const servers = useAppSelector((state)=>state.servers);

  const dispatch = useAppDispatch();

  // TODO define interfaces

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
  };

  const getUser = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/user'
    }).then((res) => {
      dispatch(setUser({id: res.data._id, username: res.data.username}));});
  };

  const getServers = async () => {
    console.log('getting servers');
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/servers/index'
    }).then((res) => {
      console.log(res);
      if (!servers.selectedServer.title && res.data.length) {
        dispatch(setServers(res.data.map((server:any)=>{return{id: server._id, title: server.title}})));
        dispatch(setSelectedServer({id: res.data[0]._id}));
        getChannels(res.data[0]._id);
      };
    })
  };

  const createServerReq = (serverTitle: string) => {
    Axios({
      method: 'POST',
      data: {
        title: serverTitle,
        id: user.id
      },
      withCredentials: true,
      url: 'http://localhost:4000/servers/create'
    }).then((res) => {
      console.log(res);

      dispatch(addServer({id: res.data.server._id, title: res.data.server.title}));
      dispatch(setChannels([{id: res.data.channel._id, title: res.data.channel.title}]));
      dispatch(setSelectedChannel({id: res.data.channel._id}));
    });
  };

  const deleteServerReq = () => {
    Axios({
      method: 'DELETE',
      data: {
        id: servers.selectedServer.id
      },
      withCredentials: true,
      url: 'http://localhost:4000/servers/delete'
    }).then(res => {
      console.log(res);
      dispatch(removeServer(servers.selectedServer.id)); // remove server client side instead of getting servers again silly
      // ^^ this dispatch auto selects the server for us
    });
  }

  const renameServerReq = (serverTitle: string) => {
    Axios({
      method: 'PUT',
      data: {
        id: servers.selectedServer.id,
        title: serverTitle
      },
      withCredentials: true,
      url: 'http://localhost:4000/servers/edit'
    }).then (res=>{
      console.log(res);
      dispatch(renameServer({id: servers.selectedServer.id, title: serverTitle}));
    });
  };

  const getChannels = (serverID: string) => {
    if (!serverID) {
      console.log("no server id", serverID);
      return;
    }
    Axios({
      method: 'GET',
      withCredentials: true,
      url: `http://localhost:4000/channels/index/${serverID}`
    }).then (res => {
      console.log(res);
      if (res.data.length) {
        dispatch(setChannels(res.data.map((channel:any)=>{
          return {id: channel._id, title: channel.title};
        })))
        dispatch(setSelectedChannel({id: res.data[0]._id}));
      }
    })
  };

  const createChannelReq = (channelTitle: string) => {
    Axios({
      method: 'POST',
      withCredentials: true,
      data: {
        id: servers.selectedServer.id,
        channelTitle
      },
      url: 'http://localhost:4000/channels/create/'
    }).then(res=>{
      dispatch(addChannel({id: res.data._id, title: res.data.title}));
    })
  }

  const editChannelsReq = (actions: IEditChannelAction[]) => {
    const edits = actions.filter(action => action.type==='EDIT');
    const deletes = actions.filter(action => action.type==='DELETE');

    Axios({
      method: 'PUT',
      withCredentials: true,
      data: {
        id: servers.selectedServer.id,
        edits,
        deletes
      },
      url: 'http://localhost:4000/channels/edit'
    }).then (res => {
      console.log(res);

      getChannels(servers.selectedServer.id); // doing this as a test. you should just delete them client side instead of making this call
    })
  }

  const logout = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/logout'
    }).then((res) => {
      console.log(res);
      dispatch(clearUser());
      window.location.href = '/'
    });
  };

  const didMount = useRef(false);

  useEffect(() => {
    isLoggedIn();
    getUser();
    getServers();

    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    getChannels(servers.selectedServer.id);

    return () => {

    }
  }, [servers.servers])

  return (
    <div>
      <div id='main' className='d-flex vh-100'>
        <ServerList createServerReq={createServerReq} getChannels={getChannels}/>
        <ChannelList 
          deleteServerReq={deleteServerReq} 
          renameServerReq={renameServerReq} 
          editChannelsReq={editChannelsReq} 
          logout={logout}
          createChannelReq={createChannelReq}/>
        <MessagePanel />
        <MemberList />
      </div>
    </div>
  )
}

export default Main

