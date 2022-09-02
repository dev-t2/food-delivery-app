import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState, IOrder, IOrdersResponse } from './orderType';

const initialState: InitialState = {
  orders: [],
  delivery: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrders: (state, action: PayloadAction<IOrdersResponse>) => {
      state.orders = action.payload.orders;
    },
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders = [...state.orders, action.payload];
    },
    acceptOrder: (state, action: PayloadAction<string>) => {
      const deliveryOrder = state.orders.find(order => order.orderId === action.payload);

      if (deliveryOrder) {
        state.orders = state.orders.filter(order => order.orderId !== action.payload);

        state.delivery = deliveryOrder;
      }
    },
    rejectOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(order => order.orderId !== action.payload);
    },
  },
});

export const { addOrders, addOrder, acceptOrder, rejectOrder } = orderSlice.actions;

export default orderSlice;
