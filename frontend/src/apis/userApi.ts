import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: builder => ({
    createUser: builder.mutation<void, void>({
      query: () => ({
        url: '/',
        method: 'POST',
        body: {},
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApi;

export default userApi;
