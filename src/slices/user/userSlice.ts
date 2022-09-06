import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState, IUser } from './userType';

const initialState: InitialState = {
  email: '',
  nickname: '',
  accessToken: '',
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
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
