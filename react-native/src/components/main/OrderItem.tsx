import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from '@emotion/native';

import { useAppDispatch } from '../../store';
import { IOrder } from '../../slices/order/orderType';
import { useAcceptMutation } from '../../slices/order/orderApi';
import { acceptOrder, rejectOrder } from '../../slices/order/orderSlice';
import { OrdersScreenNavigationProp } from '../../screens/main';
import { ContainedButtons } from '../input';
import NaverMap from './NaverMap';
import { getDistanceFromCoordinates } from '../../utils/distance';

interface IContainer {
  isDetail: boolean;
}

const Container = styled.Pressable<IContainer>(({ theme, isDetail }) => ({
  borderRadius: 4,
  padding: 10,
  backgroundColor: isDetail ? theme.colors.white : theme.colors.gray,
}));

const TextContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

interface IStyledText {
  isDetail: boolean;
}

const StyledText = styled.Text<IStyledText>(({ theme, isDetail }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: isDetail ? theme.colors.black : theme.colors.white,
}));

const DetailContainer = styled.View({
  marginTop: 10,
});

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

  const distance = useMemo(() => {
    return getDistanceFromCoordinates(
      item.start.latitude,
      item.start.longitude,
      item.end.latitude,
      item.end.longitude,
    ).toFixed(1);
  }, [item.start, item.end]);

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
      <TextContainer>
        <StyledText isDetail={isDetail}>{`￦ ${price}`}</StyledText>
        <StyledText isDetail={isDetail}>{`${distance} km`}</StyledText>
      </TextContainer>

      {isDetail && (
        <DetailContainer>
          <NaverMap item={item} />

          <ContainedButtons
            marginTop={10}
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
