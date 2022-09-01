import React, { memo, useCallback, useLayoutEffect, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store';
import { IOrder } from '../../slices/order/orderType';
import { useOrdersQuery } from '../../slices/order/orderApi';
import { addOrders } from '../../slices/order/orderSlice';
import { Separator } from '../../components/layout';
import { OrderItem } from '../../components/main';

function Orders() {
  const { isSuccess, data, isError, error } = useOrdersQuery();

  const { orders } = useAppSelector(state => state.order);

  const dispatch = useAppDispatch();

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return { padding: 10 };
  }, []);

  useLayoutEffect(() => {
    if (isSuccess && data) {
      dispatch(addOrders(data));
    }

    if (isError && error) {
      if ('status' in error) {
        console.log(error.data);
      } else {
        console.error(error);
      }
    }
  }, [isSuccess, data, dispatch, isError, error]);

  const keyExtractor = useCallback((order: IOrder) => order.orderId, []);

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
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
}

export default memo(Orders);
