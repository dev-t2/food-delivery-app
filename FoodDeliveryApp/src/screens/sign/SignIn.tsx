import React, { memo, useCallback } from 'react';
import styled from '@emotion/native';

const Container = styled.View({});

const StyledText = styled.Text({});

const StyledTextInput = styled.TextInput({});

const StyledPressable = styled.Pressable({});

function SignIn() {
  const onPress = useCallback(() => {}, []);

  return (
    <Container>
      <StyledText>이메일</StyledText>
      <StyledTextInput placeholder="이메일을 입력해주세요." />

      <StyledText>비밀번호</StyledText>
      <StyledTextInput placeholder="비밀번호를 입력해주세요." />

      <StyledPressable onPress={onPress}>
        <StyledText>로그인</StyledText>
      </StyledPressable>
    </Container>
  );
}

export default memo(SignIn);
