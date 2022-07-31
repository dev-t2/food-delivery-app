import React, { memo, useMemo } from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import SignIn from './SignIn';
import SignUp from './SignUp';

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

function Sign() {
  const signInOptions = useMemo<NativeStackNavigationOptions>(() => {
    return { title: '로그인' };
  }, []);

  const signUpOptions = useMemo<NativeStackNavigationOptions>(() => {
    return { title: '회원가입' };
  }, []);

  return (
    <Navigator initialRouteName="SignIn">
      <Screen name="SignIn" component={SignIn} options={signInOptions} />
      <Screen name="SignUp" component={SignUp} options={signUpOptions} />
    </Navigator>
  );
}

export default memo(Sign);
