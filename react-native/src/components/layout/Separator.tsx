import React, { memo } from 'react';
import styled from '@emotion/native';

interface IContainer {
  height: number;
}

const Container = styled.View<IContainer>(({ height }) => ({
  height,
}));

interface ISeparator {
  height: number;
}

function Separator({ height }: ISeparator) {
  return <Container height={height} />;
}

export default memo(Separator);
