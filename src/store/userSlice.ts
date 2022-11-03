import { createSlice } from "@reduxjs/toolkit";
import { IMember } from "../models";


const initialState = {
    id: '',
    username: '',
    friends: [] as IMember[],
    friendRequests: [] as IMember[],
    selectedFriend: {} as IMember
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
        addFriendRequest: (state, action) => {
            state.friendRequests.push(action.payload);
        },
        removeFriendRequest: (state, action) => {
            state.friendRequests = state.friendRequests.filter(x => x.id !== action.payload)
        },
        addFriend: (state, action) => {
            state.friends.push(action.payload);
        },
        removeFriend: (state, action) => {
            state.friends = state.friends.filter(x => x.id !== action.payload)
        },
        setSelectedFriend: (state, action) => {
            state.selectedFriend = action.payload;
        }
    }
});

export const { setUser, clearUser, addFriendRequest, removeFriendRequest, addFriend, removeFriend, setSelectedFriend } = userSlice.actions
export default userSlice.reducer;