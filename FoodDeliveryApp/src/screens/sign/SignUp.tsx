import React, { memo } from 'react';
import styled from '@emotion/native';

const Container = styled.View({});

const StyledText = styled.Text({});

function SignUp() {
  return (
    <Container>
      <StyledText>회원가입</StyledText>
    </Container>
  );
}

export default memo(SignUp);
