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
    updateToken: builder.mutation<IUser, string>({
      query: token => ({ url: 'token', method: 'POST', headers: { authorization: token } }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({ url: 'signout', method: 'POST' }),
    }),
    money: builder.query<IMoneyResponse, void>({
      query: () => ({ url: 'money' }),
    }),
  }),
  overrideExisting: __DEV__,
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useUpdateTokenMutation,
  useSignOutMutation,
  useMoneyQuery,
} = userApi;
