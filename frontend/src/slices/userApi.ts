import { rootApi } from './index';

interface ICreateUser {
  email: string;
  nickname: string;
  password: string;
}

const foodDeliveryApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation<void, ICreateUser>({
      query: body => ({ url: 'user', method: 'POST', body }),
    }),
  }),
});

export const { useSignUpMutation } = foodDeliveryApi;

export default foodDeliveryApi;
