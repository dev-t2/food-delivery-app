import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NaverMapView, { Marker, Path } from 'react-native-nmap';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';

import { useAppDispatch } from '../../store';
import { IOrder } from '../../slices/order/orderType';
import { useAcceptMutation } from '../../slices/order/orderApi';
import { acceptOrder, rejectOrder } from '../../slices/order/orderSlice';
import { getDistanceFromCoordinates } from '../../utils/distance';
import { OrdersScreenProp } from '../../screens/main';

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

const MapContainer = styled.View({
  width: '100%',
  height: 200,
});

const StyledNaverMapView = styled(NaverMapView)({
  width: '100%',
  height: '100%',
});

const ButtonContainer = styled.View({
  flexDirection: 'row',
  marginTop: 10,
});

interface StyledPressable {
  borderColor: string;
}

const StyledPressable = styled.Pressable<StyledPressable>(({ borderColor }) => ({
  flex: 1,
  paddingVertical: 4,
  borderWidth: 1,
  borderColor,
  borderRadius: 4,
  marginRight: 5,
}));

interface IButtonText {
  color: string;
}

const ButtonText = styled.Text<IButtonText>(({ color }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  color,
}));

interface IOrderItem {
  item: IOrder;
}

function OrderItem({ item }: IOrderItem) {
  const [accept, { isSuccess, isError, error }] = useAcceptMutation();

  const dispatch = useAppDispatch();

  const navigation = useNavigation<OrdersScreenProp['navigation']>();

  const theme = useTheme();

  const [isDetail, setIsDetail] = useState(false);

  const price = useMemo(() => {
    return item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, [item.price]);

  const distance = useMemo(() => {
    return getDistanceFromCoordinates(item.start, item.end).toFixed(1);
  }, [item.start, item.end]);

  const center = useMemo(() => {
    return {
      zoom: 9,
      latitude: (item.start.latitude + item.end.latitude) / 2,
      longitude: (item.start.longitude + item.end.longitude) / 2,
    };
  }, [item.start, item.end]);

  const anchor = useMemo(() => ({ x: 0.5, y: 0.5 }), []);

  const startCaption = useMemo(() => ({ text: '출발' }), []);

  const path = useMemo(() => [item.start, item.end], [item.start, item.end]);

  const endCaption = useMemo(() => ({ text: '도착' }), []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(acceptOrder(item.orderId));

      navigation.navigate('Delivery');
    }

    if (isError && error) {
      if ('status' in error) {
        if (error.status === 400) {
          Alert.alert('알림', (error.data as { message: string }).message);

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
          <MapContainer>
            {/* @ts-ignore: React Native Naver Map React 18 Version Compatibility Issues */}
            <StyledNaverMapView zoomControl={__DEV__} center={center}>
              <Marker
                coordinate={item.start}
                image={require('../../assets/blue-dot.png')}
                width={20}
                height={20}
                anchor={anchor}
                caption={startCaption}
              />

              <Path coordinates={path} />

              <Marker
                coordinate={item.end}
                image={require('../../assets/green-dot.png')}
                width={20}
                height={20}
                anchor={anchor}
                caption={endCaption}
              />
            </StyledNaverMapView>
          </MapContainer>

          <ButtonContainer>
            <StyledPressable borderColor={theme.colors.blue} onPress={onAccept}>
              <ButtonText color={theme.colors.blue}>ACCEPT</ButtonText>
            </StyledPressable>

            <StyledPressable borderColor={theme.colors.red} onPress={onReject}>
              <ButtonText color={theme.colors.red}>REJECT</ButtonText>
            </StyledPressable>
          </ButtonContainer>
        </DetailContainer>
      )}
    </Container>
  );
}

export default memo(OrderItem);
