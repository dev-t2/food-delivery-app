import React, { memo } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAppSelector } from '../store/hooks';
import Main from './main';
import Sign from './sign';

function RootPage() {
  const { email } = useAppSelector(state => state.user);

  return <NavigationContainer>{email ? <Main /> : <Sign />}</NavigationContainer>;
}

export default memo(RootPage);
