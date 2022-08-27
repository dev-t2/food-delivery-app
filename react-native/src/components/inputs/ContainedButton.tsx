import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '@emotion/react';
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
  isLoading?: boolean;
  text: string;
  onPress: () => void;
}

function ContainedButton({ isDisabled, isLoading, text, onPress }: IContainedButton) {
  const theme = useTheme();

  return (
    <StyledPressable disabled={isDisabled || isLoading} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.white} />
      ) : (
        <StyledText>{text}</StyledText>
      )}
    </StyledPressable>
  );
}

export default memo(ContainedButton);
