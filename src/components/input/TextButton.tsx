import React, { memo } from 'react';
import { Pressable } from 'react-native';
import styled from '@emotion/native';

const StyledText = styled.Text(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.colors.black,
  textAlign: 'center',
}));

interface ITextButton {
  isDisabled?: boolean;
  text: string;
  onPress: () => void;
}

function TextButton({ isDisabled, text, onPress }: ITextButton) {
  return (
    <Pressable disabled={isDisabled} onPress={onPress}>
      <StyledText>{text}</StyledText>
    </Pressable>
  );
}

export default memo(TextButton);
