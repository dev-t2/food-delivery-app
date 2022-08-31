import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native';

import { useAppSelector } from '../../store';
import { IOrder } from '../../slices/order/orderType';
import { useStreamOrdersQuery } from '../../slices/order/orderApi';
import { Separator } from '../../components/layout';
import { OrderItem } from '../../components/main';

function Orders() {
  useStreamOrdersQuery();

  const { orders } = useAppSelector(state => state.order);

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return { padding: 10 };
  }, []);

  const renderItem = useCallback<ListRenderItem<IOrder>>(({ item }) => {
    return <OrderItem item={item} />;
  }, []);

  const ItemSeparatorComponent = useCallback(() => {
    return <Separator height={10} />;
  }, []);

  return (
    <FlatList
      contentContainerStyle={contentContainerStyle}
      data={orders}
      keyExtractor={order => order.orderId}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
}

export default memo(Orders);
