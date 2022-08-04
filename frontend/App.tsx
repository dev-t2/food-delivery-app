import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';

import { store, useAppSelector } from './src/store';
import { theme } from './src/utilities/theme';
import { Main, Sign } from './src/pages';

function App() {
  const { email } = useAppSelector(state => state.user);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>{email ? <Main /> : <Sign />}</NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default memo(App);
