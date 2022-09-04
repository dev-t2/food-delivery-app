import React, { memo, useCallback, useEffect, useMemo } from 'react';
import styled from '@emotion/native';

import { useAppDispatch } from '../../store';
import { useMoneyQuery, useSignOutMutation } from '../../slices/user/userApi';
import { setUser } from '../../slices/user/userSlice';
import { removeEncryptedStorage } from '../../utils/encryptedStorage';
import { Container } from '../../components/layout';
import { ContainedButton } from '../../components/input';

const StyledText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.colors.black,
}));

function Settings() {
  const { data } = useMoneyQuery();

  const [signOut, { isLoading, isSuccess, isError, error }] = useSignOutMutation();

  const dispatch = useAppDispatch();

  const replacedMoney = useMemo(() => {
    if (data?.money) {
      return data.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return '0';
  }, [data?.money]);

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
    <Container padding={20}>
      <StyledText>{`The current proceeds are ￦ ${replacedMoney}`}</StyledText>

      <ContainedButton marginTop={20} isLoading={isLoading} text="SignOut" onPress={onSignOut} />
    </Container>
  );
}

export default memo(Settings);
