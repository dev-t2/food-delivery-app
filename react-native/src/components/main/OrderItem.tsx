import React, { memo, useCallback, useMemo, useState } from 'react';
import styled from '@emotion/native';

import { IOrder } from '../../slices/order/orderType';

const Container = styled.View(({ theme }) => ({
  borderRadius: 8,
  padding: 10,
  backgroundColor: theme.colors.blue,
}));

const StyledPressable = styled.Pressable({
  flexDirection: 'row',
});

const StyledText = styled.Text(({ theme }) => ({
  flex: 1,
  color: theme.colors.white,
}));

interface IOrderItem {
  item: IOrder;
}

function OrderItem({ item }: IOrderItem) {
  const [isDetail, setIsDetail] = useState(false);

  const price = useMemo(() => {
    return item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, [item.price]);

  const onDetail = useCallback(() => {
    setIsDetail(prevState => !prevState);
  }, []);

  return (
    <Container>
      <StyledPressable onPress={onDetail}>
        <StyledText>{`${price} 원`}</StyledText>
      </StyledPressable>

      {isDetail && null}
    </Container>
  );
}

export default memo(OrderItem);
