import { combineReducers } from '@reduxjs/toolkit';

import userSlice from './userSlice';

export const rootSliceReducer = combineReducers({
  user: userSlice.reducer,
});
