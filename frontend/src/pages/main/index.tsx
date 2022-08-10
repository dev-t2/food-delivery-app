import React, { memo, useMemo } from 'react';
import {
  BottomTabNavigationOptions,
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

const { Navigator, Screen } = createBottomTabNavigator<RootTabsParamList>();

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
