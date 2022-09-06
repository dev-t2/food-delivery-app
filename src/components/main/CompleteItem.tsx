import React, { memo, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import Config from 'react-native-config';
import FastImage from 'react-native-fast-image';
import styled from '@emotion/native';

import { IOrder } from '../../slices/order/orderType';

interface IStyledFastImage {
  width: number;
}

const StyledFastImage = styled(FastImage)<IStyledFastImage>(({ width }) => ({
  width: width / 3,
  height: width / 3,
}));

interface ICompleteItem {
  item: IOrder;
}

function CompleteItem({ item }: ICompleteItem) {
  const { width } = useWindowDimensions();

  const source = useMemo(() => {
    return { uri: `${Config.API_URL}/${item.image}` };
  }, [item.image]);

  return <StyledFastImage width={width} source={source} resizeMode="contain" />;
}

export default memo(CompleteItem);
