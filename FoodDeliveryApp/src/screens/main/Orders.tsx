import React, { memo } from 'react';
import styled from '@emotion/native';

const Container = styled.View({});

const StyledText = styled.Text({});

function Orders() {
  return (
    <Container>
      <StyledText>주문</StyledText>
    </Container>
  );
}

export default memo(Orders);
