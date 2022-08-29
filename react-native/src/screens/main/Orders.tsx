import React, { memo } from 'react';
import styled from '@emotion/native';

import { useGetOrdersQuery } from '../../slices/order/orderApi';

const Container = styled.View({});

const StyledText = styled.Text({});

function Orders() {
  useGetOrdersQuery();

  return (
    <Container>
      <StyledText>주문</StyledText>
    </Container>
  );
}

export default memo(Orders);
