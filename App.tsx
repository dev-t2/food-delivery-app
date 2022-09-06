import React, { memo } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Provider } from 'react-redux';

import store from './src/store';
import theme from './src/utils/theme';
import RootScreen from './src/screens';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootScreen />
      </ThemeProvider>
    </Provider>
  );
}

export default memo(App);
