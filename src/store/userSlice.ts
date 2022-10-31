import { createSlice } from "@reduxjs/toolkit";
import { IMember } from "../models";


const initialState = {
    id: '',
    username: '',
    friends: [] as IMember[],
    friendRequests: [] as IMember[]
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
        },
        clearUser: (state) => {
            state = initialState;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer;