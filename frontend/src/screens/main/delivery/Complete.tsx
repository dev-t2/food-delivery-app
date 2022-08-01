import React, { memo } from 'react';
import styled from '@emotion/native';

const Container = styled.View({});

const StyledText = styled.Text({});

function Complete() {
  return (
    <Container>
      <StyledText>완료</StyledText>
    </Container>
  );
}

export default memo(Complete);
