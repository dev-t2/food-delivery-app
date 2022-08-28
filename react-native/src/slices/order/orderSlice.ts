import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './orderType';

const initialState: InitialState = {};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
});

export const {} = orderSlice.actions;

export default orderSlice;
