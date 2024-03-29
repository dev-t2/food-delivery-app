import React, { memo, useMemo } from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Proceed from './Proceed';
import Complete from './Complete';

export type DeliveryStackParamList = {
  Proceed: undefined;
  Complete: { orderId: string };
};

export type ProceedScreenProps = NativeStackScreenProps<DeliveryStackParamList, 'Proceed'>;
export type CompleteScreenProps = NativeStackScreenProps<DeliveryStackParamList, 'Complete'>;

const { Navigator, Screen } = createNativeStackNavigator<DeliveryStackParamList>();

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
