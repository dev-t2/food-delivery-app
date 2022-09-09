import React, { memo, Ref } from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';

const Container = styled.View({
  marginBottom: 20,
});

const Label = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.colors.black,
}));

const StyledTextInput = styled.TextInput(({ theme }) => ({
  color: theme.colors.black,
  borderBottomWidth: 0.2,
  borderBottomColor: theme.colors.gray,
}));

interface IUnderlinedInput {
  underlinedInputRef?: Ref<TextInput>;
  label: string;
  placeholder: string;
  autoComplete: 'email' | 'password' | 'name';
  textContentType: 'emailAddress' | 'password' | 'nickname';
  isSecureTextEntry?: boolean;
  value: string;
  maxLength: number;
  returnKeyType: 'next' | 'done';
  isBlurOnSubmit?: boolean;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

function UnderlinedInput({
  underlinedInputRef,
  label,
  placeholder,
  autoComplete,
  textContentType,
  isSecureTextEntry = false,
  value,
  maxLength,
  returnKeyType,
  isBlurOnSubmit = true,
  onChangeText,
  onSubmit,
}: IUnderlinedInput) {
  const theme = useTheme();

  return (
    <Container>
      <Label>{label}</Label>

      <StyledTextInput
        ref={underlinedInputRef}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray}
        autoComplete={autoComplete}
        textContentType={textContentType}
        secureTextEntry={isSecureTextEntry}
        value={value}
        maxLength={maxLength}
        clearButtonMode="while-editing"
        returnKeyType={returnKeyType}
        blurOnSubmit={isBlurOnSubmit}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    </Container>
  );
}

export default memo(UnderlinedInput);
