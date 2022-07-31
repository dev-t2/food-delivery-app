import React, { memo, useCallback, useMemo, useState } from 'react';
import styled from '@emotion/native';

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

const StyledTextInput = styled.TextInput(({ theme }) => ({
  borderBottomWidth: 0.2,
  borderBottomColor: theme.colors.gray,
}));

const ButtonContainer = styled.View({
  alignItems: 'center',
});

const SignInButton = styled.Pressable(({ theme, disabled }) => ({
  backgroundColor: disabled ? theme.colors.gray : theme.colors.blue,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 4,
  marginBottom: 10,
}));

const SignInText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.colors.white,
}));

const StyledPressable = styled.Pressable({});

const SignUpText = styled.Text({});

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isDisabled = useMemo(() => {
    return !email.trim() || !password.trim();
  }, [email, password]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onSignIn = useCallback(() => {}, []);

  const onSignUp = useCallback(() => {}, []);

  return (
    <Container>
      <InputContainer>
        <StyledText>이메일</StyledText>
        <StyledTextInput placeholder="이메일을 입력해주세요." onChangeText={onChangeEmail} />
      </InputContainer>

      <InputContainer>
        <StyledText>비밀번호</StyledText>
        <StyledTextInput placeholder="비밀번호를 입력해주세요." onChangeText={onChangePassword} />
      </InputContainer>

      <ButtonContainer>
        <SignInButton onPress={onSignIn} disabled={isDisabled}>
          <SignInText>로그인</SignInText>
        </SignInButton>
      </ButtonContainer>

      <ButtonContainer>
        <StyledPressable onPress={onSignUp}>
          <SignUpText>회원가입</SignUpText>
        </StyledPressable>
      </ButtonContainer>
    </Container>
  );
}

export default memo(SignIn);
