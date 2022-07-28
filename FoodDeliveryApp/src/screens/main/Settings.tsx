import React, { memo } from 'react';
import styled from '@emotion/native';

const Container = styled.View({});

const StyledText = styled.Text({});

function Settings() {
  return (
    <Container>
      <StyledText>설정</StyledText>
    </Container>
  );
}

export default memo(Settings);
