import React, { memo, useEffect, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';

import { useAppDispatch, useAppSelector } from '../store';
import { useDeviceTokenMutation, useRefreshTokenMutation } from '../slices/user/userApi';
import { setDeviceToken, setUser } from '../slices/user/userSlice';
import { permissions } from '../utils/permissions';
import { getEncryptedStorage } from '../utils/encryptedStorage';
import Main from './main';
import Sign from './sign';

function RootScreen() {
  const [refreshToken, { isSuccess, data, isError, error }] = useRefreshTokenMutation();
  const [deviceToken] = useDeviceTokenMutation();

  const { accessToken } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    permissions();
  }, []);

  useLayoutEffect(() => {
    (async () => {
      const token = await getEncryptedStorage('refreshToken');

      if (token) {
        refreshToken(token);
      }
    })();
  }, [refreshToken]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }

    if (isError && error) {
      if ('status' in error) {
        console.log(error.data);
      } else {
        console.error(error);
      }
    }

    SplashScreen.hide();
  }, [isSuccess, data, dispatch, isError, error]);

  useEffect(() => {
    (async () => {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }

        const token = await messaging().getToken();

        console.log('phone token', token);

        dispatch(setDeviceToken({ deviceToken: token }));

        deviceToken(token);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [dispatch, deviceToken]);

  return <NavigationContainer>{accessToken ? <Main /> : <Sign />}</NavigationContainer>;
}

export default memo(RootScreen);
