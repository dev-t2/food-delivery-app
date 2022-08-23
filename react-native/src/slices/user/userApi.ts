import { api } from '../index';

interface ISignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

const userApi = api.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<void, ISignUpRequest>({
      query: body => ({ url: 'user', method: 'POST', body }),
    }),
  }),
});

export const { useSignUpMutation } = userApi;
