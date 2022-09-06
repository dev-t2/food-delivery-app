import React, { memo, useEffect, useState } from 'react';
import styled from '@emotion/native';

import { useMoneyQuery } from '../../slices/user/userApi';

const StyledText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.colors.black,
}));

function TotalMoney() {
  const { isSuccess, data, isError, error } = useMoneyQuery();

  const [totalMoney, setTotalMoney] = useState('0');

  useEffect(() => {
    if (isSuccess && data) {
      const replacedMoney = data.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      setTotalMoney(replacedMoney);
    }

    if (isError && error) {
      if ('status' in error) {
        console.log(error.data);
      } else {
        console.error(error);
      }
    }
  }, [isSuccess, data, isError, error]);

  return <StyledText>{`The current proceeds are ￦ ${totalMoney}`}</StyledText>;
}

export default memo(TotalMoney);
