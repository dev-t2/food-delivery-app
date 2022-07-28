import React, { memo } from 'react';
import styled from '@emotion/native';

const Container = styled.View({});

const StyledText = styled.Text({});

function Proceed() {
  return (
    <Container>
      <StyledText>지도</StyledText>
    </Container>
  );
}

export default memo(Proceed);
