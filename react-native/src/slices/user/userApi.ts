import { api } from '../index';
import { ISignInRequest, ISignInResponse, ISignUpRequest } from './userType';

const userApi = api.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<void, ISignUpRequest>({
      query: body => ({ url: 'signup', method: 'POST', body }),
    }),
    signIn: builder.mutation<ISignInResponse, ISignInRequest>({
      query: body => ({ url: 'signin', method: 'POST', body }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({ url: 'signout', method: 'POST' }),
    }),
  }),
  overrideExisting: __DEV__,
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } = userApi;
