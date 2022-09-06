import React, { memo, useEffect } from 'react';

import { useCompletesQuery } from '../../slices/order/orderApi';
import { Container } from '../../components/layout';
import { SignOut, TotalMoney } from '../../components/main';

function Settings() {
  const { isSuccess, data, isError, error } = useCompletesQuery();

  useEffect(() => {
    if (isSuccess && data) {
    }

    if (isError && error) {
      if ('status' in error) {
        console.log(error.data);
      } else {
        console.error(error);
      }
    }
  }, [isSuccess, data, isError, error]);

  return (
    <Container padding={20}>
      <TotalMoney />
      <SignOut />
    </Container>
  );
}

export default memo(Settings);
