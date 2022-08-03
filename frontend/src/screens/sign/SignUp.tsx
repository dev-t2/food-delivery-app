import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { Container } from '../../components/layouts';
import { ContainedButton, UnderlinedInput } from '../../components/inputs';

function SignUp() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const nicknameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const isDisabled = useMemo(() => {
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return true;
    }

    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,16}$/.test(password)) {
      return true;
    }

    return false;
  }, [email, password]);

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

  const onSubmitPassword = useCallback(() => {
    if (!isDisabled) {
      console.log('onSignUp');
    }
  }, [isDisabled]);

  const onSignUp = useCallback(() => {
    console.log('onSignUp');
  }, []);

  return (
    <Container>
      <UnderlinedInput
        label="Email"
        placeholder="Please enter your email."
        autoComplete="email"
        textContentType="emailAddress"
        value={email}
        returnKeyType="next"
        isBlurOnSubmit={false}
        onChangeText={onChangeEmail}
        onSubmit={onSubmitEmail}
      />

      <UnderlinedInput
        ref={nicknameRef}
        label="Nickname"
        placeholder="Please enter your nickname."
        autoComplete="name"
        textContentType="nickname"
        value={nickname}
        returnKeyType="next"
        isBlurOnSubmit={false}
        onChangeText={onChangeNickname}
        onSubmit={onSubmitNickname}
      />

      <UnderlinedInput
        ref={passwordRef}
        label="Password"
        placeholder="Please enter your password."
        autoComplete="password"
        textContentType="password"
        value={password}
        returnKeyType="done"
        onChangeText={onChangePassword}
        onSubmit={onSubmitPassword}
      />

      <ContainedButton isDisabled={isDisabled} text="SignUp" onPress={onSignUp} />
    </Container>
  );
}

export default memo(SignUp);
