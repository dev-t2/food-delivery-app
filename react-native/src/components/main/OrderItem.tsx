import React, { memo, useCallback, useMemo, useState } from 'react';
import styled from '@emotion/native';

import { useAppDispatch } from '../../store';
import { IOrder } from '../../slices/order/orderType';
import { rejectOrder } from '../../slices/order/orderSlice';
import { ContainedButtons } from '../input';

interface IContainer {
  isDetail: boolean;
}

const Container = styled.Pressable<IContainer>(({ theme, isDetail }) => ({
  borderRadius: 4,
  padding: 10,
  backgroundColor: isDetail ? theme.colors.white : theme.colors.gray,
}));

interface IStyledText {
  isDetail: boolean;
}

const StyledText = styled.Text<IStyledText>(({ theme, isDetail }) => ({
  flex: 1,
  fontSize: 16,
  fontWeight: 'bold',
  color: isDetail ? theme.colors.black : theme.colors.white,
}));

const DetailContainer = styled.View({
  marginTop: 10,
});

const MapContainer = styled.View({});

interface IOrderItem {
  item: IOrder;
}

function OrderItem({ item }: IOrderItem) {
  const dispatch = useAppDispatch();

  const [isDetail, setIsDetail] = useState(false);

  const price = useMemo(() => {
    return item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, [item.price]);

  const onDetail = useCallback(() => {
    setIsDetail(prevState => !prevState);
  }, []);

  const onAccept = useCallback(() => {}, []);

  const onReject = useCallback(() => {
    dispatch(rejectOrder(item.orderId));
  }, [dispatch, item.orderId]);

  return (
    <Container isDetail={isDetail} onPress={onDetail}>
      <StyledText isDetail={isDetail}>{`￦ ${price}`}</StyledText>

      {isDetail && (
        <DetailContainer>
          <MapContainer />

          <ContainedButtons
            leftText="ACCEPT"
            rightText="REJECT"
            onLeftPress={onAccept}
            onRightPress={onReject}
          />
        </DetailContainer>
      )}
    </Container>
  );
}

export default memo(OrderItem);
