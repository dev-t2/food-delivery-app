import React, { memo, useEffect, useLayoutEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../store';
import { useUpdateTokenMutation } from '../slices/user/userApi';
import { getEncryptedStorage } from '../utils/encryptedStorage';
import Main from './main';
import Sign from './sign';
import { setUser } from '../slices/user/userSlice';

function RootScreen() {
  const [updateToken, { isSuccess, data, isError, error }] = useUpdateTokenMutation();

  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector(state => state.user);

  useLayoutEffect(() => {
    (async () => {
      const refreshToken = await getEncryptedStorage('refreshToken');

      if (refreshToken) {
        updateToken(refreshToken);
      }
    })();
  }, [updateToken]);

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
