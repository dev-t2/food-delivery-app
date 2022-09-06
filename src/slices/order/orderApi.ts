import Config from 'react-native-config';
import { io } from 'socket.io-client';

import { api } from '../index';
import { IAcceptRequest, ICompletesResponse, IOrder, IOrdersResponse } from './orderType';
import { addOrder } from './orderSlice';

const orderApi = api.injectEndpoints({
  endpoints: builder => ({
    orders: builder.query<IOrdersResponse, void>({
      query: () => 'orders',
      async onCacheEntryAdded(_, { cacheDataLoaded, cacheEntryRemoved, dispatch }) {
        const socket = io(Config.BASE_URL, { transports: ['websocket'] });

        try {
          await cacheDataLoaded;

          socket.emit('order', () => {
            socket.on('order', (order: IOrder) => {
              dispatch(addOrder(order));
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
    accept: builder.mutation<void, IAcceptRequest>({
      query: body => ({ url: 'accept', method: 'POST', body }),
    }),
    complete: builder.mutation<void, FormData>({
      query: body => ({ url: 'complete', method: 'POST', body }),
      invalidatesTags: ['Money', 'Complete'],
    }),
    completes: builder.query<ICompletesResponse, void>({
      query: () => ({ url: 'completes' }),
      providesTags: ['Complete'],
    }),
  }),
  overrideExisting: __DEV__,
});

export const { useOrdersQuery, useAcceptMutation, useCompleteMutation, useCompletesQuery } =
  orderApi;
