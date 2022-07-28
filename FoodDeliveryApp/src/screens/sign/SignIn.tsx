import React, { memo } from 'react';
import styled from '@emotion/native';

const Container = styled.View({});

const StyledText = styled.Text({});

function SignIn() {
  return (
    <Container>
      <StyledText>로그인</StyledText>
    </Container>
  );
}

export default memo(SignIn);
