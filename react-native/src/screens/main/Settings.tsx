import React, { memo, useCallback, useEffect } from 'react';

import { useAppDispatch } from '../../store';
import { useMoneyQuery, useSignOutMutation } from '../../slices/user/userApi';
import { setUser } from '../../slices/user/userSlice';
import { removeEncryptedStorage } from '../../utils/encryptedStorage';
import { Container } from '../../components/layout';
import { ContainedButton } from '../../components/input';
import { MoneyInfo } from '../../components/main';

function Settings() {
  const { data } = useMoneyQuery();

  const [signOut, { isLoading, isSuccess, isError, error }] = useSignOutMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ email: '', nickname: '', accessToken: '' }));

      (async () => {
        try {
          await removeEncryptedStorage('refreshToken');
        } catch (err) {
          console.error(err);
        }
      })();
    }

    if (isError && error) {
      if ('status' in error) {
        console.log(error.data);
      } else {
        console.error(error);
      }
    }
  }, [isSuccess, dispatch, isError, error]);

  const onSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <MoneyInfo money={data?.money} />

      <ContainedButton marginTop={20} isLoading={isLoading} text="SignOut" onPress={onSignOut} />
    </Container>
  );
}

export default memo(Settings);
