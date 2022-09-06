import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItem, StyleProp, ViewStyle } from 'react-native';

import { IOrder } from '../../slices/order/orderType';
import { useCompletesQuery } from '../../slices/order/orderApi';
import { Container } from '../../components/layout';
import { CompleteItem, SignOut, TotalMoney } from '../../components/main';

function Settings() {
  const { isSuccess, data, isError, error } = useCompletesQuery();

  const [completes, setCompletes] = useState<IOrder[]>([]);

  const style = useMemo<StyleProp<ViewStyle>>(() => {
    return { marginTop: 20 };
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      setCompletes(data.completes);
    }

    if (isError && error) {
      if ('status' in error) {
        console.log(error.data);
      } else {
        console.error(error);
      }
    }
  }, [isSuccess, data, isError, error]);

  const renderItem = useCallback<ListRenderItem<IOrder>>(({ item }) => {
    return <CompleteItem item={item} />;
  }, []);

  const keyExtractor = useCallback((item: IOrder) => item.orderId, []);

  return (
    <Container padding={20}>
      <TotalMoney />

      <FlatList
        style={style}
        numColumns={3}
        data={completes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />

      <SignOut />
    </Container>
  );
}

export default memo(Settings);
