import React, { memo, useMemo } from 'react';
import NaverMapView, { Marker, Path } from 'react-native-nmap';
import styled from '@emotion/native';

import { IOrder } from '../../slices/order/orderType';

const Container = styled.View({
  width: '100%',
  height: 200,
});

const StyledNaverMapView = styled(NaverMapView)({ width: '100%', height: '100%' });

interface INaverMap {
  item: IOrder;
}

function NaverMap({ item }: INaverMap) {
  const center = useMemo(() => {
    return {
      zoom: 10,
      latitude: (item.start.latitude + item.end.latitude) / 2,
      longitude: (item.start.longitude + item.end.longitude) / 2,
    };
  }, [item.start, item.end]);

  const startCoordinate = useMemo(() => {
    return { latitude: item.start.latitude, longitude: item.start.longitude };
  }, [item.start]);

  const pathCoordinate = useMemo(() => {
    return [
      { latitude: item.start.latitude, longitude: item.start.longitude },
      { latitude: item.end.latitude, longitude: item.end.longitude },
    ];
  }, [item.start, item.end]);

  const endCoordinate = useMemo(() => {
    return { latitude: item.end.latitude, longitude: item.end.longitude };
  }, [item.end]);

  return (
    <Container>
      {/* @ts-ignore: React Native Naver Map React 18 Version Compatibility Issues */}
      <StyledNaverMapView zoomControl={__DEV__} center={center}>
        <Marker coordinate={startCoordinate} pinColor="blue" />
        <Path coordinates={pathCoordinate} />
        <Marker coordinate={endCoordinate} />
      </StyledNaverMapView>
    </Container>
  );
}

export default memo(NaverMap);
