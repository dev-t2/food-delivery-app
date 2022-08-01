import React, { memo, useMemo } from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import SignIn from './SignIn';
import SignUp from './SignUp';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

function Sign() {
  const signInOptions = useMemo<NativeStackNavigationOptions>(() => {
    return { title: 'Sign In' };
  }, []);

  const signUpOptions = useMemo<NativeStackNavigationOptions>(() => {
    return { title: 'Sign Up' };
  }, []);

  return (
    <Navigator initialRouteName="SignIn">
      <Screen name="SignIn" component={SignIn} options={signInOptions} />
      <Screen name="SignUp" component={SignUp} options={signUpOptions} />
    </Navigator>
  );
}

export default memo(Sign);
