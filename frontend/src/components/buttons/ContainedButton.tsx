import React, { memo } from 'react';
import styled from '@emotion/native';

const StyledPressable = styled.Pressable(({ theme, disabled }) => ({
  backgroundColor: disabled ? theme.colors.gray : theme.colors.blue,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 4,
  marginBottom: 10,
}));

const StyledText = styled.Text(({ theme }) => ({
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.colors.white,
}));

interface IContainedButton {
  isDisabled: boolean;
  text: string;
  onPress: () => void;
}

function ContainedButton({ isDisabled, text, onPress }: IContainedButton) {
  return (
    <StyledPressable disabled={isDisabled} onPress={onPress}>
      <StyledText>{text}</StyledText>
    </StyledPressable>
  );
}

export default memo(ContainedButton);
