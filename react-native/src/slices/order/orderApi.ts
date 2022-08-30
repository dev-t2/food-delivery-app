import Config from 'react-native-config';
import { io } from 'socket.io-client';

import { api } from '../index';
import { IOrder } from './orderType';
import { addOrder } from './orderSlice';

const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    getOrders: builder.query<IOrder[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, dispatch }) {
        const socket = io(Config.BASE_URL, { transports: ['websocket'] });

        try {
          await cacheDataLoaded;

          socket.emit('order');

          socket.on('order', (order: IOrder) => {
            dispatch(addOrder(order));
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
