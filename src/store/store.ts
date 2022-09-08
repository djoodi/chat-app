import { configureStore, Store } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from './userSlice';
import serversReducer from './serversSlice';
import channelsReducer from './channelsSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        servers: serversReducer,
        channels: channelsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;