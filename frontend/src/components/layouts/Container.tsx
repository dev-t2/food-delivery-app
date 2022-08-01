import React, { memo, ReactNode } from 'react';
import styled from '@emotion/native';

const StyledView = styled.View({
  padding: 20,
});

interface IContainer {
  children: ReactNode;
}

function Container({ children }: IContainer) {
  return <StyledView>{children}</StyledView>;
}

export default memo(Container);
