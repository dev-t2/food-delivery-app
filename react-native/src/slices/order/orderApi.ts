import Config from 'react-native-config';
import { io } from 'socket.io-client';

import { api } from '../index';
import { IAcceptOrderRequest, IOrder } from './orderType';
import { addOrder } from './orderSlice';

const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    streamOrders: builder.query<IOrder[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(_, { cacheEntryRemoved, dispatch }) {
        const socket = io(Config.BASE_URL, { transports: ['websocket'] });

        socket.emit('order');

        socket.on('order', (order: IOrder) => {
          dispatch(addOrder(order));
        });

        await cacheEntryRemoved;

        socket.disconnect();
      },
    }),
    acceptOrder: builder.mutation<void, IAcceptOrderRequest>({
      query: body => ({ url: 'accept', method: 'POST', body }),
    }),
  }),
  overrideExisting: __DEV__,
});

export const { useStreamOrdersQuery } = orderApi;
