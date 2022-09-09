import { api } from '../index';
import { IMoneyResponse, ISignInRequest, ISignInResponse, ISignUpRequest, IUser } from './userType';

const userApi = api.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<void, ISignUpRequest>({
      query: body => ({ url: 'signup', method: 'POST', body }),
    }),
    signIn: builder.mutation<ISignInResponse, ISignInRequest>({
      query: body => ({ url: 'signin', method: 'POST', body }),
    }),
    refreshToken: builder.mutation<IUser, string>({
      query: token => ({ url: 'refreshToken', method: 'POST', headers: { authorization: token } }),
    }),
    deviceToken: builder.mutation<void, string>({
      query: body => ({ url: 'deviceToken', method: 'POST', body }),
    }),
    money: builder.query<IMoneyResponse, void>({
      query: () => ({ url: 'money' }),
      providesTags: ['Money'],
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({ url: 'signout', method: 'POST' }),
    }),
  }),
  overrideExisting: __DEV__,
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useRefreshTokenMutation,
  useDeviceTokenMutation,
  useMoneyQuery,
  useSignOutMutation,
} = userApi;
