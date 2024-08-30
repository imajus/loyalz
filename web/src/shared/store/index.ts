'use client';

import userSlice from '@/shared/store/slice/user';
import { Web3User } from '@/shared/types';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

export const reducer = combineReducers({ user: userSlice });

export const createStore = () =>
  configureStore({
    reducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type StoreState = { user: Web3User };
