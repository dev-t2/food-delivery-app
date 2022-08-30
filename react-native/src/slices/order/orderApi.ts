import Config from 'react-native-config';
import { io } from 'socket.io-client';

import { api } from '../index';
import { IOrder } from './orderType';

const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    getOrders: builder.query<IOrder[], void>({
      query: () => 'orders',
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, updateCachedData }) {
        const socket = io(Config.BASE_URL, { transports: ['websocket'] });

        try {
          await cacheDataLoaded;

          socket.emit('order');

          socket.on('order', (order: IOrder) => {
            updateCachedData(draft => {
              draft.push(order);
            });
          });
        } catch (error) {
          console.error(error);
        } finally {
          await cacheEntryRemoved;

          socket.disconnect();
        }
      },
    }),
  }),
  overrideExisting: __DEV__,
});

export const { useGetOrdersQuery } = orderApi;
