import React, { memo, useEffect, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../store';
import { useRefreshTokenMutation } from '../slices/user/userApi';
import { setUser } from '../slices/user/userSlice';
import { permissions } from '../utils/permissions';
import { getEncryptedStorage } from '../utils/encryptedStorage';
import Main from './main';
import Sign from './sign';

function RootScreen() {
  const [refreshToken, { isSuccess, data, isError, error }] = useRefreshTokenMutation();

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
  }, [isSuccess, data, dispatch, isError, error]);

  return <NavigationContainer>{accessToken ? <Main /> : <Sign />}</NavigationContainer>;
}

export default memo(RootScreen);
