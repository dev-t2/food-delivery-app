import { api } from '../index';

interface ISignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

interface ISignInRequest {
  email: string;
  password: string;
}

const userApi = api.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<void, ISignUpRequest>({
      query: body => ({ url: 'signup', method: 'POST', body }),
    }),
    signIn: builder.mutation<void, ISignInRequest>({
      query: body => ({ url: 'signin', method: 'POST', body }),
    }),
  }),
  overrideExisting: __DEV__,
});

export const { useSignUpMutation, useSignInMutation } = userApi;
