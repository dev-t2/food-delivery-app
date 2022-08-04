import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { validateEmail, validatePassword } from '../../utilities/validate';
import { DismissKeyboardContainer } from '../../components/layouts';
import { ContainedButton, UnderlinedInput } from '../../components/inputs';

function SignUp() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const nicknameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const isDisabled = useMemo(() => {
    const isValidate = validateEmail(email) && nickname.trim() && validatePassword(password);

    return !isValidate;
  }, [email, nickname, password]);

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
    if (!isDisabled) {
      console.log('onSignUp');
    }
  }, [isDisabled]);

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
        onSubmit={onSubmitPassword}
      />

      <ContainedButton isDisabled={isDisabled} text="SignUp" onPress={onSignUp} />
    </DismissKeyboardContainer>
  );
}

export default memo(SignUp);
