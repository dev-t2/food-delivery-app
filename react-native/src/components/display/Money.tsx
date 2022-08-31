import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import styled from '@emotion/native';

const StyledText = styled.Text({
  fontSize: 16,
  fontWeight: 'bold',
});

interface IMoney {
  money: number;
}

function Money({ money }: IMoney) {
  const replacedMoney = useMemo(() => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }, [money]);

  return (
    <View>
      <StyledText>
        현재 수익금은 <StyledText>{replacedMoney}</StyledText> 원입니다.
      </StyledText>
    </View>
  );
}

export default memo(Money);
