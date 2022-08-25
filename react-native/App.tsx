import React, { memo } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';

import store from './src/store';
import theme from './src/theme';
import RootPage from './src/pages';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootPage />
      </ThemeProvider>
    </Provider>
  );
}

export default memo(App);
