import { io } from 'socket.io-client';
import Config from 'react-native-config';

import { api } from '../index';

const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    getOrders: builder.query({
      query: () => '/socket.io',
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved }) {
        const socket = io(Config.BASE_URL);

        try {
          await cacheDataLoaded;
        } catch (error) {
          console.error(error);
        } finally {
          await cacheEntryRemoved;

          socket.close();
        }
      },
    }),
  }),
  overrideExisting: __DEV__,
});

export const {} = orderApi;
