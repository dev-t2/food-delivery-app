import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState, IOrder } from './orderType';

const initialState: InitialState = {
  orders: [],
  deliveries: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders = [...state.orders, action.payload];
    },
    acceptOrder: (state, action: PayloadAction<string>) => {
      const findOrder = state.orders.find(order => order.orderId === action.payload);

      if (findOrder) {
        state.deliveries = [...state.deliveries, findOrder];

        state.orders = state.orders.filter(order => order.orderId !== action.payload);
      }
    },
    rejectOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(order => order.orderId !== action.payload);
    },
  },
});

export const { addOrder, acceptOrder, rejectOrder } = orderSlice.actions;

export default orderSlice;
