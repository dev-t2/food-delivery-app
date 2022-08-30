import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState, IUser } from './userType';

const initialState: InitialState = {
  email: '',
  nickname: '',
  accessToken: '',
  money: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken;
    },
    setMoney: (state, action: PayloadAction<number>) => {
      state.money = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
