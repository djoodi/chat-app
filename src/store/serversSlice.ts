import { createSlice } from "@reduxjs/toolkit";
import { IServer } from '../models';

const initialState = {
    selectedServer: {} as IServer,
    servers: [] as IServer[]
}

export const serversSlice = createSlice({
    name: 'server',
    initialState,
    reducers: {
        setServers: (state, action) => {
            console.log(action.payload);
            state.servers = action.payload;
        },
        addServer: (state, action) => { // Adding a server will autoselect it
            state.servers.push(action.payload);
            state.selectedServer = action.payload;
        },
        removeServer: (state, action) => { // Removing a server will autoselect the one before it, if any
            const index = state.servers.findIndex(server => server.id === action.payload);
            state.servers = state.servers.filter(server => server.id !== action.payload);
            state.selectedServer = state.servers[index - 1] || {} as IServer;
        },
        renameServer: (state, action) => { // Can only be done on the selected server
            state.servers = state.servers.map((server) => {
                if (server.id === action.payload.id)
                    return {...server, title: action.payload.title};
                else
                    return server;
            });
            state.selectedServer.title = action.payload.title;
        },
        setSelectedServer: (state, action) => {
            state.selectedServer = state.servers.find((server) => server.id === action.payload.id) || {} as IServer
        }
    }
});

export const { setServers, addServer, removeServer, renameServer, setSelectedServer } = serversSlice.actions
export default serversSlice.reducer;