import React, { memo, useEffect, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../store';
import { useUpdateAccessTokenMutation } from '../slices/user/userApi';
import { setUser } from '../slices/user/userSlice';
import { getEncryptedStorage } from '../utils/encryptedStorage';
import Main from './main';
import Sign from './sign';

function RootScreen() {
  const [updateAccessToken, { isSuccess, data, isError, error }] = useUpdateAccessTokenMutation();

  const { accessToken } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    (async () => {
      const refreshToken = await getEncryptedStorage('refreshToken');

      if (refreshToken) {
        updateAccessToken(refreshToken);
      }
    })();
  }, [updateAccessToken]);

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
