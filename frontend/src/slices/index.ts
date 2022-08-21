import { combineReducers } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

import userSlice from './userSlice';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({ baseUrl: Config.BASE_URL }),
  endpoints: () => ({}),
});

export const rootReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  user: userSlice.reducer,
});
