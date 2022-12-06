import React, { useEffect, useRef, useState } from 'react'
import Axios from 'axios';
import { io } from 'socket.io-client';
import ServerList from './components/ServerList';
import ChannelList from './components/ChannelList';
import MemberList from './components/MemberList';
import MessagePanel from './components/MessagePanel';
import './components/styles.css';
import { IServer, IChannel, IEditChannelAction } from './models';
import { useAppSelector, useAppDispatch } from './store/store'
import { clearUser, setUser, removeFriendRequest, addFriend, removeFriend, setSocketID } from './store/userSlice';
import { addServer, removeServer, renameServer, setSelectedServer, setServers } from './store/serversSlice';
import { addChannel, setSelectedChannel, setChannels } from './store/channelsSlice';
import * as Views from './views';

const socket = io('http://localhost:4000', {
  withCredentials: true,
  autoConnect: true
});

const Main = () => {

  const user = useAppSelector((state) => state.user);
  const servers = useAppSelector((state) => state.servers);

  const dispatch = useAppDispatch();

  // TODO define interfaces

  const isLoggedIn = () => {
    console.log("checking if logged in")
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/app'
    }).then((res) => {
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
      console.log(res);
      dispatch(setUser({
        id: res.data._id,
        username: res.data.username,
        friends: res.data.friends.map((x: { _id: string, username: string }) => {
          return { id: x._id, username: x.username };
        }),
        friendRequests: res.data.friendRequests.map((x: { _id: string, username: string }) => {
          return { id: x._id, username: x.username }
        }
        )
      }));
    });
  };

  const getServers = async () => {
    console.log('getting servers');
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/servers/index'
    }).then((res) => {
      if (!servers.selectedServer.title && res.data.length) {
        dispatch(setServers(res.data.map((server: any) => { return { id: server._id, title: server.title } })));
        dispatch(setSelectedServer({ id: res.data[0]._id }));
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
      dispatch(addServer({ id: res.data.server._id, title: res.data.server.title }));
      dispatch(setChannels([{ id: res.data.channel._id, title: res.data.channel.title }]));
      dispatch(setSelectedChannel({ id: res.data.channel._id }));
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
    }).then(res => {
      dispatch(renameServer({ id: servers.selectedServer.id, title: serverTitle }));
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
    }).then(res => {
      if (res.data.length) {
        dispatch(setChannels(res.data.map((channel: any) => {
          return { id: channel._id, title: channel.title };
        })))
        dispatch(setSelectedChannel({ id: res.data[0]._id }));
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
    }).then(res => {
      dispatch(addChannel({ id: res.data._id, title: res.data.title }));
    })
  }

  const editChannelsReq = (actions: IEditChannelAction[]) => {
    const edits = actions.filter(action => action.type === 'EDIT');
    const deletes = actions.filter(action => action.type === 'DELETE');

    Axios({
      method: 'PUT',
      withCredentials: true,
      data: {
        id: servers.selectedServer.id,
        edits,
        deletes
      },
      url: 'http://localhost:4000/channels/edit'
    }).then(res => {
      getChannels(servers.selectedServer.id); // TODO: doing this as a test. you should just delete them client side instead of making this call
      // actually, you will need to make some sort of socket event so all subscribed users (users in the server that are online) see the update
    })
  }

  const sendFriendRequest = (recipient: string, callback: (message: string, isSuccess: boolean) => void) => {
    Axios({
      method: 'POST',
      withCredentials: true,
      data: {
        recipient
      },
      url: 'http://localhost:4000/friendRequest'
    }).then(res => {
      if (res.data) {
        callback('Friend Request sent!', true);
      } else {
        callback('User does not exist', false);
      }
    });
  }

  const acceptFriendRequest = (id: string) => {
    Axios({
      method: 'POST',
      withCredentials: true,
      data: {
        id
      },
      url: 'http://localhost:4000/acceptFriendRequest'
    }).then(res => {
      console.log(res);
      dispatch(addFriend(res.data));
      dispatch(removeFriendRequest(res.data.id));
    })
  }

  const declineFriendRequest = (id: string) => {
    Axios({
      method: 'POST',
      withCredentials: true,
      data: {
        id
      },
      url: 'http://localhost:4000/declineFriendRequest'
    }).then(res => {
      console.log(res);
      dispatch(removeFriendRequest(res.data.id));
    })
  }

  const deleteFriend = (id: string) => {
    Axios({
      method: 'DELETE',
      withCredentials: true,
      data: {
        id
      },
      url: 'http://localhost:4000/deleteFriend'
    }).then(res => {
      console.log(res);
      dispatch(removeFriend(res.data));
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

  const onSocketConnect = () => {
    Axios({
      method: 'PUT',
      withCredentials: true,
      url: 'http://localhost:4000/connect'
    }).then((res) => {
      console.log(res);
    })
  }

  const onSocketDisconnect = () => {
    Axios({
      method: 'PUT',
      withCredentials: true,
      url: 'http://localhost:4000/disconnect'
    }).then((res) => {
      console.log(res);
    })
  }

  const didMount = useRef(false);

  useEffect(() => {
    isLoggedIn();
    getUser();
    getServers();

    socket.on('connect', () => {
      dispatch(setSocketID(socket.id));
      onSocketConnect();
    });

    socket.on('disconnect', () => {
      dispatch(setSocketID(''));
      onSocketDisconnect();
    });

    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    getChannels(servers.selectedServer.id);

    return () => {
      socket.off('connect');
    }
  }, [servers.servers])

  return (
    <div>
      <div id='main' className='d-flex vh-100'>
        <ServerList createServerReq={createServerReq} getChannels={getChannels} />
        <ChannelList
          deleteServerReq={deleteServerReq}
          renameServerReq={renameServerReq}
          editChannelsReq={editChannelsReq}
          logout={logout}
          createChannelReq={createChannelReq}
          sendFriendRequest={sendFriendRequest}
        />
        <MessagePanel
          acceptFriendRequest={acceptFriendRequest}
          declineFriendRequest={declineFriendRequest}
          deleteFriend={deleteFriend}
        />
        <MemberList />
      </div>
    </div>
  )
}

export default Main

