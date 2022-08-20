import React, { memo } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';

import { theme } from './src/utils/theme';
import store from './src/store';
import RootPage from './src/pages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RootPage />
      </Provider>
    </ThemeProvider>
  );
}

export default memo(App);
