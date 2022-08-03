import React, { memo, Ref } from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '@emotion/react';
import styled from '@emotion/native';

const Container = styled.View({
  marginBottom: 20,
});

const Label = styled.Text({
  fontSize: 16,
  fontWeight: 'bold',
});

const StyledTextInput = styled.TextInput(({ theme }) => ({
  borderBottomWidth: 0.2,
  borderBottomColor: theme.colors.gray,
}));

interface IUnderlinedInput {
  ref?: Ref<TextInput>;
  label: string;
  placeholder: string;
  autoComplete: 'email' | 'password' | 'name';
  textContentType: 'emailAddress' | 'password' | 'nickname';
  value: string;
  returnKeyType: 'next' | 'done';
  isBlurOnSubmit?: boolean;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

function UnderlinedInput({
  ref,
  label,
  placeholder,
  autoComplete,
  textContentType,
  value,
  returnKeyType,
  isBlurOnSubmit = true,
  onChangeText,
  onSubmit,
}: IUnderlinedInput) {
  const theme = useTheme();

  return (
    <Container>
      {label && <Label>{label}</Label>}

      <StyledTextInput
        ref={ref}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray}
        autoComplete={autoComplete}
        textContentType={textContentType}
        clearButtonMode="while-editing"
        value={value}
        returnKeyType={returnKeyType}
        blurOnSubmit={isBlurOnSubmit}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
    </Container>
  );
}

export default memo(UnderlinedInput);
