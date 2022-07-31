import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import styled from '@emotion/native';

import { SignInScreenProps } from './types';
import { EmailInput, PasswordInput } from '../../components';

const Container = styled.View({
  padding: 20,
});

const SignInButton = styled.Pressable(({ theme, disabled }) => ({
  backgroundColor: disabled ? theme.colors.gray : theme.colors.blue,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 4,
  marginBottom: 10,
}));

const SignInText = styled.Text(({ theme }) => ({
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.colors.white,
}));

const SignUpButton = styled.Pressable({});

const SignUpText = styled.Text({
  textAlign: 'center',
});

function SignIn({ navigation }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const isDisabled = useMemo(() => {
    return !email.trim() || !password.trim();
  }, [email, password]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onSubmitEmail = useCallback(() => {
    setEmail(prev => prev.trim());

    passwordRef.current?.focus();
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onSignIn = useCallback(() => {}, []);

  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <Container>
      <EmailInput
        emailRef={emailRef}
        email={email}
        onChangeEmail={onChangeEmail}
        onSubmitEmail={onSubmitEmail}
      />

      <PasswordInput
        passwordRef={passwordRef}
        password={password}
        onChangePassword={onChangePassword}
        onSubmitPassword={onSignIn}
      />

      <SignInButton onPress={onSignIn} disabled={isDisabled}>
        <SignInText>Sign In</SignInText>
      </SignInButton>

      <SignUpButton onPress={onSignUp}>
        <SignUpText>Sign Up</SignUpText>
      </SignUpButton>
    </Container>
  );
}

export default memo(SignIn);
