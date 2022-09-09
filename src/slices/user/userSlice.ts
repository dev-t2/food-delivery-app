import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IDeviceToken, InitialState, IUser } from './userType';

const initialState: InitialState = {
  deviceToken: '',
  email: '',
  nickname: '',
  accessToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setDeviceToken: (state, action: PayloadAction<IDeviceToken>) => {
      state.deviceToken = action.payload.deviceToken;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { setDeviceToken, setUser } = userSlice.actions;

export default userSlice;
