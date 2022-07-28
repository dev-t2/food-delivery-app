import React, { memo, useMemo } from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Orders, Settings } from '../screens/main';
import Delivery from './Delivery';

export type MainParamList = {
  Orders: undefined;
  Settings: undefined;
  DeliveryNavigator: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator();

function Main() {
  const ordersOptions = useMemo<BottomTabNavigationOptions>(() => {
    return { title: '오더 목록' };
  }, []);

  const settingsOptions = useMemo<BottomTabNavigationOptions>(() => {
    return { title: '내 정보' };
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
