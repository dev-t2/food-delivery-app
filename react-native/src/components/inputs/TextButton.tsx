import React, { memo } from 'react';
import styled from '@emotion/native';

const StyledPressable = styled.Pressable({});

const StyledText = styled.Text({
  textAlign: 'center',
});

interface ITextButton {
  text: string;
  onPress: () => void;
}

function TextButton({ text, onPress }: ITextButton) {
  return (
    <StyledPressable onPress={onPress}>
      <StyledText>{text}</StyledText>
    </StyledPressable>
  );
}

export default memo(TextButton);
