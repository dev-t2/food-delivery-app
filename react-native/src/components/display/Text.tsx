import React, { memo, ReactNode } from 'react';
import styled from '@emotion/native';

interface IStyledText {
  fontSize?: number;
  isBold?: boolean;
}

const StyledText = styled.Text<IStyledText>(({ fontSize, isBold }) => ({
  fontSize,
  fontWeight: isBold ? 'bold' : undefined,
}));

interface IText {
  fontSize?: number;
  isBold?: boolean;
  children: ReactNode;
}

function Text({ fontSize, isBold, children }: IText) {
  return (
    <StyledText fontSize={fontSize} isBold={isBold}>
      {children}
    </StyledText>
  );
}

export default memo(Text);
