import React, { memo, Ref } from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';

const Container = styled.View({
  marginBottom: 20,
});

const StyledText = styled.Text({
  fontSize: 16,
  fontWeight: 'bold',
});

const StyledTextInput = styled.TextInput(({ theme }) => ({
  borderBottomWidth: 0.2,
  borderBottomColor: theme.colors.gray,
}));

interface IPasswordInput {
  passwordRef: Ref<TextInput>;
  password: string;
  onChangePassword: (text: string) => void;
  onSubmitPassword: () => void;
}

function PasswordInput({
  passwordRef,
  password,
  onChangePassword,
  onSubmitPassword,
}: IPasswordInput) {
  const theme = useTheme();

  return (
    <Container>
      <StyledText>Password</StyledText>

      <StyledTextInput
        ref={passwordRef}
        clearButtonMode="while-editing"
        autoComplete="password"
        textContentType="password"
        secureTextEntry
        returnKeyType="done"
        placeholder="Please enter your password."
        placeholderTextColor={theme.colors.gray}
        value={password}
        onChangeText={onChangePassword}
        onSubmitEditing={onSubmitPassword}
      />
    </Container>
  );
}

export default memo(PasswordInput);
