import React, { memo, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import styled from '@emotion/native';

import { IOrder } from '../../slices/order/orderType';

interface IStyledFastImage {
  windowWidth: number;
}

const StyledFastImage = styled(FastImage)<IStyledFastImage>(({ windowWidth }) => ({
  width: (windowWidth - 40) / 3 - 2,
  height: (windowWidth - 40) / 3 - 2,
  margin: 1,
}));

interface ICompleteItem {
  item: IOrder;
}

function CompleteItem({ item }: ICompleteItem) {
  const { width } = useWindowDimensions();

  const source = useMemo(() => {
    return { uri: `${Config.BASE_URL}/${item.image}` };
  }, [item.image]);

  return <StyledFastImage windowWidth={width} source={source} resizeMode="contain" />;
}

export default memo(CompleteItem);
