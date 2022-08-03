import React, { memo, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { NavigationContainer } from '@react-navigation/native';

import { theme } from './src/theme';
import { Main, Sign } from './src/pages';

function App() {
  const [isLoggedIn] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>{isLoggedIn ? <Main /> : <Sign />}</NavigationContainer>
    </ThemeProvider>
  );
}

export default memo(App);
