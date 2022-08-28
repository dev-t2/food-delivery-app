import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState, ISignInResponse } from './userType';

const initialState: InitialState = {
  email: '',
  nickname: '',
  accessToken: '',
  refreshToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ISignInResponse>) => {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice;
