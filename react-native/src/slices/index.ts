import { combineReducers } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

import userSlice from './user/userSlice';
import orderSlice from './order/orderSlice';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: Config.BASE_URL }),
  endpoints: () => ({}),
});

export const rootReducer = combineReducers({
  api: api.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer,
});
