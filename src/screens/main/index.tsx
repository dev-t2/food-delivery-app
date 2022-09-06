import React, { memo, useMemo } from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Orders from './Orders';
import Delivery, { DeliveryStackParamList } from '../delivery';
import Settings from './Settings';

type RootTabsParamList = {
  Orders: undefined;
  Delivery: NavigatorScreenParams<DeliveryStackParamList>;
  Settings: undefined;
};

export type OrdersScreenProp = BottomTabScreenProps<RootTabsParamList, 'Orders'>;
export type DeliveryScreenProp = BottomTabScreenProps<RootTabsParamList, 'Delivery'>;

const { Navigator, Screen } = createBottomTabNavigator<RootTabsParamList>();

function Main() {
  const ordersOptions = useMemo<BottomTabNavigationOptions>(() => {
    return { title: 'Orders' };
  }, []);

  const deliveryOptions = useMemo<BottomTabNavigationOptions>(() => {
    return { headerShown: false };
  }, []);

  const settingsOptions = useMemo<BottomTabNavigationOptions>(() => {
    return { title: 'Settings' };
  }, []);

  return (
    <Navigator initialRouteName="Orders">
      <Screen name="Orders" component={Orders} options={ordersOptions} />
      <Screen name="Delivery" component={Delivery} options={deliveryOptions} />
      <Screen name="Settings" component={Settings} options={settingsOptions} />
    </Navigator>
  );
}

export default memo(Main);
