import { api } from '../index';

const orderApi = api.injectEndpoints({
  endpoints: () => ({}),
  overrideExisting: __DEV__,
});

export const {} = orderApi;
