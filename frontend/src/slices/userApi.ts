import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ICreateUser {
  email: string;
  name: string;
  password: string;
}

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: builder => ({
    createUser: builder.mutation<void, ICreateUser>({
      query: body => ({ url: 'user', method: 'POST', body }),
    }),
  }),
});

export const { useCreateUserMutation } = userApi;

export default userApi;
