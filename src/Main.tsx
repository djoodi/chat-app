import React, { useEffect, useRef, useState } from 'react'
import Axios from 'axios';
import ServerList from './components/ServerList';
import ChannelList from './components/ChannelList';
import MemberList from './components/MemberList';
import MessagePanel from './components/MessagePanel';
import './components/styles.css';
import { ServerInfo, ChannelInfo } from './models';

const Main = () => {

  // TODO define interfaces
  const [userData, setUserData] = useState<any>(null);
  const [servers, setServers] = useState<any>(null);
  const [serverTitle, setServerTitle] = useState<string>('');
  const [selectedServer, setSelectedServer] = useState<ServerInfo>({id: '', title: ''});
  const [channels, setChannels] = useState<ChannelInfo[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<ChannelInfo>({id: '', title: ''});
  const [channelTitle, setChannelTitle] = useState<string>('');

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
      setUserData(res.data);});
  };

  const getServers = async () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/servers/index'
    }).then((res) => {
      console.log(res);
      setServers(res.data);
      if (selectedServer.title==="" && res.data.length) {
        console.log('auto select server');
        setSelectedServer({id: res.data[0]._id, title: res.data[0].title});
        getChannels(res.data[0]._id);
      };
    })
  };

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
      setServers([...servers, res.data.server]);
      setSelectedServer({id: res.data._id, title: res.data.title});
      setChannels([{id: res.data.channel._id, title: res.data.channel.title}]);
      setSelectedChannel({id: res.data.channel._id, title: res.data.channel.title});
    });
  };

  const deleteServer = () => {
    Axios({
      method: 'DELETE',
      data: {
        id: selectedServer.id
      },
      withCredentials: true,
      url: 'http://localhost:4000/servers/delete'
    }).then(res => {
      console.log(res);
      setServers(servers.filter((server:any) => server._id !== selectedServer.id)); // remove server client side instead of getting servers again silly
      if (servers) setSelectedServer({id: servers[0]._id, title: servers[0].title});
      else setSelectedServer({id: '', title: ''});
    });
  }

  const renameServer = () => {
    Axios({
      method: 'PUT',
      data: {
        id: selectedServer.id,
        title: serverTitle
      },
      withCredentials: true,
      url: 'http://localhost:4000/servers/edit'
    }).then (res=>{
      console.log(res);
      setServers(servers.map((server:any)=>{
        if (server._id === selectedServer.id) return {...server, title: serverTitle};
        return server;
      }));
      setSelectedServer({...selectedServer, title: serverTitle});
      setServerTitle('');
    });
  };

  const getChannels = (serverID: string) => {
    console.log('getting channels');
    Axios({
      method: 'GET',
      withCredentials: true,
      url: `http://localhost:4000/channels/index/${serverID}`
    }).then (res => {
      if (res.data.length) {
        setSelectedChannel(res.data[0]);
        setChannels(res.data.map((channel:any)=>{
          return {id: channel._id, title: channel.title};
        }))
      }
    })
  };

  const createChannel = () => {
    Axios({
      method: 'POST',
      withCredentials: true,
      data: {
        id: selectedServer.id,
        channelTitle
      },
      url: 'http://localhost:4000/channels/create/'
    }).then(res=>{
      console.log(res);
      setChannels([...channels, {id: res.data._id, title: res.data.title}]);
      setSelectedChannel({id: res.data._id, title: res.data.title});
    })
  }

  const editChannel = () => {

  }

  const logout = () => {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/logout'
    }).then((res) => {
      console.log(res);
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

    getChannels(selectedServer.id);

    return () => {

    }
  }, [selectedServer])

  return (
    <div>
      <div id='main' className='d-flex vh-100'>
        <ServerList 
          createServer={createServer} 
          serverTitle={serverTitle} 
          setServerTitle={setServerTitle} 
          servers={servers} 
          setSelectedServer={setSelectedServer}
          />
        <ChannelList 
          selectedServerTitle={selectedServer.title} 
          deleteServer={deleteServer} 
          serverTitle={serverTitle} 
          setServerTitle={setServerTitle} 
          renameServer={renameServer} 
          logout={logout} 
          username={userData?.username}
          channels={channels}
          setChannels={setChannels}
          channelTitle={channelTitle}
          setChannelTitle={setChannelTitle}
          createChannel={createChannel}
          setSelectedChannel={setSelectedChannel}
          editChannel={editChannel}
          />
        <MessagePanel selectedChannel={selectedChannel}/>
        <MemberList />
      </div>
    </div>
  )
}

export default Main