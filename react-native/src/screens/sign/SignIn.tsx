import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { SignInScreenProps } from './index';
import { useAppDispatch } from '../../store';
import { useSignInMutation } from '../../slices/user/userApi';
import { setUser } from '../../slices/user/userSlice';
import { isValidateEmail, isValidatePassword } from '../../utils/validation';
import { DismissKeyboardContainer } from '../../components/layouts';
import { ContainedButton, TextButton, UnderlinedInput } from '../../components/inputs';

function SignIn({ navigation }: SignInScreenProps) {
  const [signIn, { isLoading, isSuccess, data, isError, error }] = useSignInMutation();

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef<TextInput>(null);

  const isDisabled = useMemo(() => {
    return !email.trim() || !password.trim();
  }, [email, password]);

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

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const onSubmitEmail = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onSignIn = useCallback(() => {
    if (!isValidateEmail(email)) {
      console.log('올바른 이메일 주소를 입력해 주세요.');
    } else if (!isValidatePassword(password)) {
      console.log('비밀번호는 영문, 숫자를 모두 포함하여 8자 이상 입력해 주세요.');
    } else {
      signIn({ email, password });
    }
  }, [email, password, signIn]);

  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <DismissKeyboardContainer>
      <UnderlinedInput
        label="Email"
        placeholder="Please enter your email."
        autoComplete="email"
        textContentType="emailAddress"
        value={email}
        maxLength={26}
        returnKeyType="next"
        isBlurOnSubmit={false}
        onChangeText={onChangeEmail}
        onSubmit={onSubmitEmail}
      />

      <UnderlinedInput
        underlinedInputRef={passwordRef}
        label="Password"
        placeholder="Please enter your password."
        autoComplete="password"
        textContentType="password"
        isSecureTextEntry
        value={password}
        maxLength={16}
        returnKeyType="done"
        onChangeText={onChangePassword}
        onSubmit={onSignIn}
      />

      <ContainedButton
        isDisabled={isDisabled}
        isLoading={isLoading}
        text="SignIn"
        onPress={onSignIn}
      />

      <TextButton text="SignUp" onPress={onSignUp} />
    </DismissKeyboardContainer>
  );
}

export default memo(SignIn);
