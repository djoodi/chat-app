import { createSlice } from "@reduxjs/toolkit";
import { IChannel } from "../models";

const initialState = {
    selectedChannel: {} as IChannel,
    channels: [] as IChannel[],
}

export const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setChannels: (state, action) => {
            state.channels = action.payload;
        },
        addChannel: (state, action) => { // Adding a channel will auto select it
            state.channels.push(action.payload);
            state.selectedChannel = action.payload;
        },
        removeChannel: (state, action) => { // Removing a channel will auto select the one before it, if any
            const index = state.channels.findIndex(channel => channel.id === action.payload.id);
            state.channels = state.channels.filter(channel => channel.id !== action.payload.id);
            state.selectedChannel = state.channels[index-1] || {} as IChannel;
        },
        renameChannel: (state, action) => {
            state.channels = state.channels.map((channel) => {
                if (channel.id === action.payload.id)
                    return {...channel, title: action.payload.title};
                else
                    return channel;
            })
            state.selectedChannel.title = action.payload.title;
        },
        setSelectedChannel: (state, action) => {
            state.selectedChannel = state.channels.find((channel) => channel.id === action.payload.id) || {} as IChannel
        },
        clearChannels: (state) => {
            state.channels = [];
            state.selectedChannel = {} as IChannel;
        }
    }
});

export const {setChannels, addChannel, removeChannel, renameChannel, setSelectedChannel}= channelsSlice.actions;
export default channelsSlice.reducer;