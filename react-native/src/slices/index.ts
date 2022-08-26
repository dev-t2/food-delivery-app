import { combineReducers } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

import userSlice from './user/userSlice';

interface IErrorWithMessage {
  data: {
    message: string;
  };
}

export function isErrorWithMessage(error: unknown): error is IErrorWithMessage {
  return (
    error !== null &&
    typeof error === 'object' &&
    'data' in error &&
    typeof (error as IErrorWithMessage).data.message === 'string'
  );
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: Config.BASE_URL }),
  endpoints: () => ({}),
});

export const rootReducer = combineReducers({
  api: api.reducer,
  user: userSlice.reducer,
});
