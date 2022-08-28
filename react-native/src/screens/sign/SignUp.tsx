import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { SignUpScreenProps } from './index';
import { useSignUpMutation } from '../../slices/user/userApi';
import { isValidateEmail, isValidatePassword } from '../../utils/validation';
import { DismissKeyboardContainer } from '../../components/layouts';
import { ContainedButton, UnderlinedInput } from '../../components/inputs';

function SignUp({ navigation }: SignUpScreenProps) {
  const [signUp, { isLoading, isSuccess, isError, error }] = useSignUpMutation();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const nicknameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const isDisabled = useMemo(() => {
    return !email.trim() || !nickname.trim() || !password.trim();
  }, [email, nickname, password]);

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('SignIn');
    }

    if (isError && error) {
      if ('status' in error) {
        console.log(error.data);
      } else {
        console.error(error);
      }
    }
  }, [isSuccess, navigation, isError, error]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const onSubmitEmail = useCallback(() => {
    nicknameRef.current?.focus();
  }, []);

  const onChangeNickname = useCallback((text: string) => {
    setNickname(text.trim());
  }, []);

  const onSubmitNickname = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onSignUp = useCallback(() => {
    if (!isValidateEmail(email)) {
      console.log('올바른 이메일 주소를 입력해 주세요.');
    } else if (!isValidatePassword(password)) {
      console.log('비밀번호는 영문, 숫자를 모두 포함하여 8자 이상 입력해 주세요.');
    } else {
      signUp({ email, nickname, password });
    }
  }, [email, password, signUp, nickname]);

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
        underlinedInputRef={nicknameRef}
        label="Nickname"
        placeholder="Please enter your nickname."
        autoComplete="name"
        textContentType="nickname"
        value={nickname}
        maxLength={10}
        returnKeyType="next"
        isBlurOnSubmit={false}
        onChangeText={onChangeNickname}
        onSubmit={onSubmitNickname}
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
        onSubmit={onSignUp}
      />

      <ContainedButton
        isDisabled={isDisabled}
        isLoading={isLoading}
        text="SignUp"
        onPress={onSignUp}
      />
    </DismissKeyboardContainer>
  );
}

export default memo(SignUp);
