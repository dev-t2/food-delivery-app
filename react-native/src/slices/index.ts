import { combineReducers } from '@reduxjs/toolkit';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';

import { RootState } from '../store';
import { IUser } from './user/userType';
import userSlice, { setUser } from './user/userSlice';
import orderSlice from './order/orderSlice';
import { getEncryptedStorage } from '../utils/encryptedStorage';

const baseQuery = fetchBaseQuery({
  baseUrl: Config.BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const isAuthorization = headers.has('authorization');

    const { accessToken } = (getState() as RootState).user;

    if (!isAuthorization && accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const fetchBaseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 419 &&
    result.error.data &&
    (result.error.data as { code: string }).code === 'expired'
  ) {
    const token = await getEncryptedStorage('refreshToken');

    if (token) {
      const response = await baseQuery(
        { url: 'refreshToken', method: 'POST', headers: { authorization: `Bearer ${token}` } },
        api,
        extraOptions,
      );

      if (response.data) {
        api.dispatch(setUser(response.data as IUser));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(setUser({ email: '', nickname: '', accessToken: '' }));
      }
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQueryWithReauth,
  endpoints: () => ({}),
});

export const rootReducer = combineReducers({
  api: api.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer,
});
