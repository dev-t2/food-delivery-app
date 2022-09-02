import React, { memo, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import NaverMapView, { Marker, Path } from 'react-native-nmap';
import styled from '@emotion/native';

import { useAppSelector } from '../../store';
import { ProceedScreenProps } from './index';
import { Container } from '../../components/layout';

const StyledNaverMapView = styled(NaverMapView)({
  width: '100%',
  height: '100%',
});

const StyledText = styled.Text({});

interface IPosition {
  latitude: number;
  longitude: number;
}

function Proceed({ navigation }: ProceedScreenProps) {
  const { width, height } = useWindowDimensions();

  const { delivery } = useAppSelector(state => state.order);

  const [myPosition, setMyPosition] = useState<IPosition | null>(null);

  const center = useMemo(() => {
    if (delivery) {
      return {
        zoom: 9,
        latitude: (delivery.start.latitude + delivery.end.latitude) / 2,
        longitude: (delivery.start.longitude + delivery.end.longitude) / 2,
      };
    }

    return undefined;
  }, [delivery]);

  const anchor = useMemo(() => {
    return { x: 0.5, y: 0.5 };
  }, []);

  const myCaption = useMemo(() => ({ text: 'Current Location' }), []);

  const path1 = useMemo(() => {
    if (!myPosition || !delivery) {
      return [];
    }

    return [myPosition, delivery.start];
  }, [delivery, myPosition]);

  const startingCaption = useMemo(() => ({ text: 'Starting Position' }), []);

  const path2 = useMemo(() => {
    if (!delivery) {
      return [];
    }

    return [delivery.start, delivery.end];
  }, [delivery]);

  const arrivalCaption = useMemo(() => ({ text: 'Arrival Location' }), []);

  useLayoutEffect(() => {
    Geolocation.watchPosition(
      info => {
        setMyPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      console.error,
      { distanceFilter: 100, enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  const onArrival = useCallback(() => {
    if (delivery) {
      navigation.push('Complete', { orderId: delivery.orderId });
    }
  }, [navigation, delivery]);

  if (!delivery) {
    return (
      <Container isCenter>
        <StyledText>No order selected.</StyledText>
      </Container>
    );
  }

  if (!myPosition) {
    return (
      <Container isCenter>
        <StyledText>
          Loading my location. Please check if you have allowed the location permission.
        </StyledText>
      </Container>
    );
  }

  return (
    <Container width={width} height={height}>
      {/* @ts-ignore: React Native Naver Map React 18 Version Compatibility Issues */}
      <StyledNaverMapView zoomControl={__DEV__} center={center}>
        <Marker
          coordinate={myPosition}
          image={require('../../assets/red-dot.png')}
          width={15}
          height={15}
          anchor={anchor}
          caption={myCaption}
        />

        <Path coordinates={path1} color="orange" />

        <Marker
          coordinate={delivery.start}
          image={require('../../assets/blue-dot.png')}
          width={15}
          height={15}
          anchor={anchor}
          caption={startingCaption}
        />

        <Path coordinates={path2} color="orange" />

        <Marker
          coordinate={delivery.end}
          image={require('../../assets/green-dot.png')}
          width={15}
          height={15}
          anchor={anchor}
          caption={arrivalCaption}
          onClick={onArrival}
        />
      </StyledNaverMapView>
    </Container>
  );
}

export default memo(Proceed);
