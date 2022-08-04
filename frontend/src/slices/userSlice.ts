import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: InitialState = {
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
