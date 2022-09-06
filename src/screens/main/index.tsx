import React, { memo, useMemo } from 'react';
import { NavigatorScreenParams } from '@react-navigation/native';
import {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
    return {
      title: 'Orders',
      tabBarLabelStyle: { fontWeight: 'bold' },
      tabBarIcon: ({ color }) => <FontAwesome5Icon name="list" size={24} color={color} />,
    };
  }, []);

  const deliveryOptions = useMemo<BottomTabNavigationOptions>(() => {
    return {
      headerShown: false,
      title: 'Map',
      tabBarLabelStyle: { fontWeight: 'bold' },
      tabBarIcon: ({ color }) => <FontAwesome5Icon name="map" size={24} color={color} />,
    };
  }, []);

  const settingsOptions = useMemo<BottomTabNavigationOptions>(() => {
    return {
      title: 'Settings',
      tabBarLabelStyle: { fontWeight: 'bold' },
      tabBarIcon: ({ color }) => <FontAwesomeIcon name="gear" size={24} color={color} />,
    };
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
