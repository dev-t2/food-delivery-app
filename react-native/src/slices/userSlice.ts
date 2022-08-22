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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice;
