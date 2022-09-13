import { createSlice } from "@reduxjs/toolkit";
import * as Views from '../views';


const initialState = {
    view: Views.SERVERS
}

export const viewsSlice = createSlice({
    name: 'views',
    initialState,
    reducers: {
        setView: (state, action) => {
            state.view = action.payload;
        }
    }
});

export const { setView } = viewsSlice.actions
export default viewsSlice.reducer;