import React, { memo, useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@emotion/react';

import { useAppSelector } from '../../store';
import { IOrder } from '../../slices/order/orderType';
import { useStreamOrdersQuery } from '../../slices/order/orderApi';
import { Separator } from '../../components/layout';
import { OrderItem } from '../../components/main';

function Orders() {
  const { isSuccess } = useStreamOrdersQuery();

  const { orders } = useAppSelector(state => state.order);

  const theme = useTheme();

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return { padding: 10 };
  }, []);

  const renderItem = useCallback<ListRenderItem<IOrder>>(({ item }) => {
    return <OrderItem item={item} />;
  }, []);

  const ItemSeparatorComponent = useCallback(() => {
    return <Separator height={10} />;
  }, []);

  return isSuccess ? (
    <FlatList
      contentContainerStyle={contentContainerStyle}
      data={orders}
      keyExtractor={order => order.orderId}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  ) : (
    <ActivityIndicator color={theme.colors.white} />
  );
}

export default memo(Orders);
