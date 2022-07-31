import React, { memo, useCallback } from 'react';
import styled from '@emotion/native';

const Container = styled.View({});

const StyledText = styled.Text({});

const StyledTextInput = styled.TextInput({});

const ButtonContainer = styled.View({
  alignItems: 'center',
});

const SignInButton = styled.Pressable(({ theme }) => ({
  backgroundColor: theme.colors.gray,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 4,
  marginBottom: 10,
}));

const SignInText = styled.Text(({ theme }) => ({
  color: theme.colors.white,
}));

const StyledPressable = styled.Pressable({});

function SignIn() {
  const onSignIn = useCallback(() => {}, []);

  const onSignUp = useCallback(() => {}, []);

  return (
    <Container>
      <StyledText>이메일</StyledText>
      <StyledTextInput placeholder="이메일을 입력해주세요." />

      <StyledText>비밀번호</StyledText>
      <StyledTextInput placeholder="비밀번호를 입력해주세요." />

      <ButtonContainer>
        <SignInButton onPress={onSignIn}>
          <SignInText>로그인</SignInText>
        </SignInButton>
      </ButtonContainer>

      <ButtonContainer>
        <StyledPressable onPress={onSignUp}>
          <StyledText>회원가입</StyledText>
        </StyledPressable>
      </ButtonContainer>
    </Container>
  );
}

export default memo(SignIn);
