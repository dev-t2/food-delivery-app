import React, { memo, useMemo } from 'react';
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Orders from './Orders';
import Delivery from '../delivery';
import Settings from './Settings';

export type RootTabsParamList = {
  Orders: undefined;
  Delivery: undefined;
  Settings: undefined;
};

export type OrdersScreenNavigationProp = BottomTabNavigationProp<RootTabsParamList, 'Orders'>;

const { Navigator, Screen } = createBottomTabNavigator<RootTabsParamList>();

function Main() {
  const ordersOptions = useMemo<BottomTabNavigationOptions>(() => {
    return { title: 'Orders' };
  }, []);

  const settingsOptions = useMemo<BottomTabNavigationOptions>(() => {
    return { title: 'Settings' };
  }, []);

  return (
    <Navigator initialRouteName="Orders">
      <Screen name="Orders" component={Orders} options={ordersOptions} />
      <Screen name="Delivery" component={Delivery} />
      <Screen name="Settings" component={Settings} options={settingsOptions} />
    </Navigator>
  );
}

export default memo(Main);
