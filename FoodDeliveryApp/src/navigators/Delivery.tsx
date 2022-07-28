import React, { memo, useMemo } from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import { Complete, Proceed } from '../screens/main/delivery';

export type DeliveryParamList = {
  Proceed: undefined;
  Complete: { orderId: string };
};

const { Navigator, Screen } = createNativeStackNavigator();

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
    <Navigator initialRouteName="Ing" screenOptions={screenOptions}>
      <Screen name="Proceed" component={Proceed} options={proceedOptions} />
      <Screen name="Complete" component={Complete} options={completeOptions} />
    </Navigator>
  );
}

export default memo(Delivery);
