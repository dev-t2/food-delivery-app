import React, { memo, ReactNode } from 'react';
import styled from '@emotion/native';

interface IStyledView {
  isCenter: boolean;
  width?: number;
  height?: number;
  padding: number;
}

const StyledView = styled.View<IStyledView>(({ width, height, padding, isCenter }) => ({
  flex: isCenter ? 1 : undefined,
  justifyContent: isCenter ? 'center' : undefined,
  alignItems: isCenter ? 'center' : undefined,
  width,
  height,
  padding,
}));

interface IContainer {
  children: ReactNode;
  isCenter?: boolean;
  width?: number;
  height?: number;
  padding?: number;
}

function Container({ children, isCenter = false, width, height, padding = 0 }: IContainer) {
  return (
    <StyledView isCenter={isCenter} width={width} height={height} padding={padding}>
      {children}
    </StyledView>
  );
}

export default memo(Container);
