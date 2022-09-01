import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from '@emotion/native';

import { useAppDispatch } from '../../store';
import { IOrder } from '../../slices/order/orderType';
import { useAcceptMutation } from '../../slices/order/orderApi';
import { acceptOrder, rejectOrder } from '../../slices/order/orderSlice';
import { OrdersScreenNavigationProp } from '../../screens/main';
import { ContainedButtons } from '../input';
import { Alert } from 'react-native';

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
  const [accept, { isSuccess, isError, error }] = useAcceptMutation();

  const dispatch = useAppDispatch();

  const navigation = useNavigation<OrdersScreenNavigationProp>();

  const [isDetail, setIsDetail] = useState(false);

  const price = useMemo(() => {
    return item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, [item.price]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(acceptOrder(item.orderId));

      navigation.navigate('Delivery');
    }

    if (isError && error) {
      if ('status' in error) {
        if (error.status === 400) {
          Alert.alert('Notification', (error.data as { message: string }).message);

          dispatch(rejectOrder(item.orderId));
        } else {
          console.log(error.data);
        }
      } else {
        console.error(error);
      }
    }
  }, [isSuccess, dispatch, item.orderId, navigation, isError, error]);

  const onDetail = useCallback(() => {
    setIsDetail(prevState => !prevState);
  }, []);

  const onAccept = useCallback(() => {
    accept({ orderId: item.orderId });
  }, [accept, item.orderId]);

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
