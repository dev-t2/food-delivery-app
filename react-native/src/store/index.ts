import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { rootApi, rootReducer } from '../slices';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;

      return getDefaultMiddleware().concat(rootApi.middleware, createDebugger());
    }

    return getDefaultMiddleware().concat(rootApi.middleware);
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
