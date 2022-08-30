import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Text } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store';
import { useSignOutMutation } from '../../slices/user/userApi';
import { setUser } from '../../slices/user/userSlice';
import { removeEncryptedStorage } from '../../utils/encryptedStorage';
import { Container } from '../../components/layout';
import { BoldText } from '../../components/display';
import { ContainedButton } from '../../components/input';

function Settings() {
  const [signOut, { isLoading, isSuccess, isError, error }] = useSignOutMutation();

  const { money, nickname } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const replacedMoney = useMemo(() => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, [money]);

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
      <Text>
        {nickname} 님의 수익금 <BoldText text={replacedMoney} /> 원
      </Text>

      <ContainedButton marginTop={20} isLoading={isLoading} text="SignOut" onPress={onSignOut} />
    </Container>
  );
}

export default memo(Settings);
