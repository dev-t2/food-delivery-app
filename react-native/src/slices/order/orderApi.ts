import Config from 'react-native-config';
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

import { api } from '../index';
import { IOrder } from './orderType';

const ordersAdapter = createEntityAdapter<IOrder>({
  selectId: order => order.orderId,
});

const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    getOrders: builder.query<EntityState<IOrder>, void>({
      query: () => 'orders',
      transformResponse(response: IOrder[]) {
        return ordersAdapter.addMany(ordersAdapter.getInitialState(), response);
      },
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved }) {
        const socket = io(Config.BASE_URL, { transports: ['websocket'] });

        try {
          await cacheDataLoaded;

          socket.emit('login', 'hello');

          socket.on('hello', data => {
            console.log(data);
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
