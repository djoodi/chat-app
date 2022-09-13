import { createSlice } from "@reduxjs/toolkit";
import { IMember } from "../models";

const initialState = {
    members: [] as IMember[]
};

export const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        setMembers: (state, action) => {
            state.members = action.payload;
        },
        clearMembers: (state) => {
            state.members = [] as IMember[];
        }
    }
});

export const { setMembers, clearMembers } = membersSlice.actions
export default membersSlice.reducer;