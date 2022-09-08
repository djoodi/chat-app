import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: '',
    username: ''
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