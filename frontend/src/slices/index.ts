import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import userApi from './userApi';

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  userApi: userApi.reducer,
});

export const rootMiddlewares = [userApi.middleware];
