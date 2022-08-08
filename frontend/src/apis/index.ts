import { combineReducers } from '@reduxjs/toolkit';

import userApi from './userApi';

export const rootApiReducer = combineReducers({
  userApi: userApi.reducer,
});

export const apiMiddlewares = [userApi.middleware];
