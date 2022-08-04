import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  name: '',
  accessToken: '',
  refreshToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});
