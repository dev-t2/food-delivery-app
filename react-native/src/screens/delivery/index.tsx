import React, { memo, useMemo } from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import Proceed from './Proceed';
import Complete from './Complete';

export type RootStackParamList = {
  Proceed: undefined;
  Complete: { orderId: string };
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

function Delivery() {
  const screenOptions = useMemo<NativeStackNavigationOptions>(() => {
    return { headerShown: false };
  }, []);

  const proceedOptions = useMemo<NativeStackNavigationOptions>(() => {
    return { title: '내 주문' };
  }, []);

  const completeOptions = useMemo<NativeStackNavigationOptions>(() => {
    return { title: '완료하기' };
  }, []);

  return (
    <Navigator initialRouteName="Proceed" screenOptions={screenOptions}>
      <Screen name="Proceed" component={Proceed} options={proceedOptions} />
      <Screen name="Complete" component={Complete} options={completeOptions} />
    </Navigator>
  );
}

export default memo(Delivery);
