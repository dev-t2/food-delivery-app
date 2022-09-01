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
    updateAccessToken: builder.mutation<IUser, string>({
      query: accessToken => ({
        url: 'accessToken',
        method: 'POST',
        headers: { authorization: accessToken },
      }),
    }),
    money: builder.query<IMoneyResponse, void>({
      query: () => ({ url: 'money' }),
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
  useUpdateAccessTokenMutation,
  useMoneyQuery,
  useSignOutMutation,
} = userApi;
