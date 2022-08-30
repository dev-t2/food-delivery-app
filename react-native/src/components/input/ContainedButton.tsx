import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';

interface IStyledPressable {
  marginTop?: number;
}

const StyledPressable = styled.Pressable<IStyledPressable>(({ theme, marginTop, disabled }) => ({
  backgroundColor: disabled ? theme.colors.gray : theme.colors.blue,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 4,
  marginTop,
  marginBottom: 10,
}));

const StyledText = styled.Text(({ theme }) => ({
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.colors.white,
}));

interface IContainedButton {
  marginTop?: number;
  isDisabled?: boolean;
  isLoading?: boolean;
  text: string;
  onPress: () => void;
}

function ContainedButton({ marginTop, isDisabled, isLoading, text, onPress }: IContainedButton) {
  const theme = useTheme();

  return (
    <StyledPressable marginTop={marginTop} disabled={isDisabled || isLoading} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.white} />
      ) : (
        <StyledText>{text}</StyledText>
      )}
    </StyledPressable>
  );
}

export default memo(ContainedButton);
