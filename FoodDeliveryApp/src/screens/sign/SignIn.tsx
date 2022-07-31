import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { Alert, TextInput } from 'react-native';
import styled from '@emotion/native';

import { SignInScreenProps } from './types';
import { EmailInput, PasswordInput } from '../../components';

const Container = styled.View({
  padding: 20,
});

const InputContainer = styled.View({
  marginBottom: 20,
});

const StyledText = styled.Text({
  fontSize: 16,
  fontWeight: 'bold',
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

  const onSignIn = useCallback(() => {
    if (!email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }

    if (!password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }

    Alert.alert('알림', '로그인 되었습니다.');
  }, [email, password]);

  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <Container>
      <InputContainer>
        <StyledText>이메일</StyledText>

        <EmailInput
          emailRef={emailRef}
          email={email}
          onChangeEmail={onChangeEmail}
          onSubmitEmail={onSubmitEmail}
        />
      </InputContainer>

      <InputContainer>
        <StyledText>비밀번호</StyledText>

        <PasswordInput
          passwordRef={passwordRef}
          password={password}
          onChangePassword={onChangePassword}
          onSubmitPassword={onSignIn}
        />
      </InputContainer>

      <SignInButton onPress={onSignIn} disabled={isDisabled}>
        <SignInText>로그인</SignInText>
      </SignInButton>

      <SignUpButton onPress={onSignUp}>
        <SignUpText>회원가입</SignUpText>
      </SignUpButton>
    </Container>
  );
}

export default memo(SignIn);
