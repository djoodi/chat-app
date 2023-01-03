import { createSlice } from "@reduxjs/toolkit";
import { IMember, IFriend } from "../models";


const initialState = {
    id: '',
    username: '',
    friends: [] as IFriend[],
    friendRequests: [] as IMember[],
    selectedFriend: {} as IFriend,
    socketID: '',
    online: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.friends = action.payload.friends;
            state.friendRequests = action.payload.friendRequests;
        },
        clearUser: (state) => {
            state = initialState;
        },
        // takes an object of id and username
        addFriendRequest: (state, action) => {
            state.friendRequests.push(action.payload);
        },
        // takes the ID
        removeFriendRequest: (state, action) => {
            state.friendRequests = state.friendRequests.filter(x => x.id !== action.payload)
        },
        // takes an object of id, username, and roomID
        addFriend: (state, action) => {
            state.friends.push(action.payload);
        },
        // takes an ID
        removeFriend: (state, action) => {
            state.friends = state.friends.filter(x => x.id !== action.payload);
        },
        // takes an object of id, username, and roomID
        setSelectedFriend: (state, action) => {
            state.selectedFriend = action.payload;
        },
        // takes an object of id and isOnline
        setFriendOnlineStatus: (state, action) => {
            state.friends.map(x => {
                if (x.id === action.payload.id)
                    x.isOnline = action.payload.isOnline;
            })
        },
        setSocketID: (state, action) => {
            state.socketID = action.payload;
        }
    }
});

export const { setUser, clearUser, addFriendRequest, removeFriendRequest, addFriend, removeFriend, setSelectedFriend, setSocketID, setFriendOnlineStatus} = userSlice.actions
export default userSlice.reducer;