import { combineReducers } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import userSlice from './userSlice';

export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: () => ({}),
});

export const rootReducer = combineReducers({
  [rootApi.reducerPath]: rootApi.reducer,
  user: userSlice.reducer,
});
