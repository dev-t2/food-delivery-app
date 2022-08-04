import React, { memo, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './src/store';
import { theme } from './src/utilities/theme';
import { Main, Sign } from './src/pages';

function App() {
  const [isLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>{isLoggedIn ? <Main /> : <Sign />}</NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default memo(App);
