import { rootApi } from './index';

interface ICreateUser {
  email: string;
  nickname: string;
  password: string;
}

const foodDeliveryApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation<void, ICreateUser>({
      query: body => ({ url: 'user', method: 'POST', body }),
    }),
  }),
});

export const { useCreateUserMutation } = foodDeliveryApi;

export default foodDeliveryApi;
