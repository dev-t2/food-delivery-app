import { combineReducers } from '@reduxjs/toolkit';

import foodDeliveryApi from './foodDeliveryApi';
import userSlice from './userSlice';

export const rootReducer = combineReducers({
  [foodDeliveryApi.reducerPath]: foodDeliveryApi.reducer,
  user: userSlice.reducer,
});

export const rootMiddleware = [foodDeliveryApi.middleware];
