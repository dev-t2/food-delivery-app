import React, { memo } from 'react';
import styled from '@emotion/native';

const StyledPressable = styled.Pressable({});

const StyledText = styled.Text({
  textAlign: 'center',
});

interface ITextButton {
  isDisabled?: boolean;
  text: string;
  onPress: () => void;
}

function TextButton({ isDisabled, text, onPress }: ITextButton) {
  return (
    <StyledPressable disabled={isDisabled} onPress={onPress}>
      <StyledText>{text}</StyledText>
    </StyledPressable>
  );
}

export default memo(TextButton);
