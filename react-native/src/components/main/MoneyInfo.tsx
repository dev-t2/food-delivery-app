import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';

const StyledText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.colors.black,
}));

interface IMoney {
  money?: number;
}

function Money({ money }: IMoney) {
  const replacedMoney = useMemo(() => {
    if (money) {
      return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return '0';
  }, [money]);

  return (
    <View>
      <StyledText>{`The current proceeds are ￦ ${replacedMoney}`}</StyledText>
    </View>
  );
}

export default memo(Money);
