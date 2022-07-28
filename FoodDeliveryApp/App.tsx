import React, { memo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Main, Sign } from './src/navigators';

function App() {
  const [isLoggedIn] = useState(false);

  return <NavigationContainer>{isLoggedIn ? <Main /> : <Sign />}</NavigationContainer>;
}

export default memo(App);
