import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native';

import { IOrder } from '../../slices/order/orderType';
import { useStreamOrdersQuery } from '../../slices/order/orderApi';
import { Separator } from '../../components/layout';
import { OrderItem } from '../../components/main';

function Orders() {
  const { data } = useStreamOrdersQuery();

  const style = useMemo<StyleProp<ViewStyle>>(() => {
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
      style={style}
      data={data}
      keyExtractor={order => order.orderId}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
}

export default memo(Orders);
