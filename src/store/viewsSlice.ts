import { createSlice } from "@reduxjs/toolkit";
import * as Views from '../views';


const initialState = {
    view: Views.FRIENDS
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