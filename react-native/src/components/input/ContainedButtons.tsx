import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';

interface IContainer {
  marginTop?: number;
  marginBottom?: number;
}

const Container = styled.View<IContainer>(({ marginTop, marginBottom }) => ({
  flexDirection: 'row',
  marginTop,
  marginBottom,
}));

const LeftPressable = styled.Pressable(({ theme }) => ({
  flex: 1,
  paddingVertical: 4,
  borderWidth: 1,
  borderColor: theme.colors.blue,
  borderRadius: 4,
  marginRight: 5,
}));

const LeftText = styled.Text(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  color: theme.colors.blue,
}));

const RightPressable = styled.Pressable(({ theme }) => ({
  flex: 1,
  paddingVertical: 4,
  borderWidth: 1,
  borderColor: theme.colors.red,
  borderRadius: 4,
  marginLeft: 5,
}));

const RightText = styled.Text(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  color: theme.colors.red,
}));

interface IContainedButtons {
  marginTop?: number;
  marginBottom?: number;
  isLoading?: boolean;
  leftText: string;
  rightText: string;
  onLeftPress: () => void;
  onRightPress: () => void;
}

function ContainedButtons({
  marginTop,
  marginBottom,
  isLoading,
  leftText,
  rightText,
  onLeftPress,
  onRightPress,
}: IContainedButtons) {
  const theme = useTheme();

  return (
    <Container marginTop={marginTop} marginBottom={marginBottom}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.white} />
      ) : (
        <>
          <LeftPressable onPress={onLeftPress}>
            <LeftText>{leftText}</LeftText>
          </LeftPressable>

          <RightPressable onPress={onRightPress}>
            <RightText>{rightText}</RightText>
          </RightPressable>
        </>
      )}
    </Container>
  );
}

export default memo(ContainedButtons);
