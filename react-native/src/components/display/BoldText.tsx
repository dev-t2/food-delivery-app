import React, { memo } from 'react';
import styled from '@emotion/native';

const StyledText = styled.Text({ fontWeight: 'bold' });

interface IBoldText {
  text: string;
}

function BoldText({ text }: IBoldText) {
  return <StyledText>{text}</StyledText>;
}

export default memo(BoldText);
