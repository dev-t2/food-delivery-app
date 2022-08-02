import React, { memo } from 'react';
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

interface IEmailInput {
  email: string;
  onChangeEmail: (text: string) => void;
  onSubmitEmail: () => void;
}

function EmailInput({ email, onChangeEmail, onSubmitEmail }: IEmailInput) {
  const theme = useTheme();

  return (
    <Container>
      <StyledText>Email</StyledText>

      <StyledTextInput
        clearButtonMode="while-editing"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        returnKeyType="next"
        blurOnSubmit={false}
        placeholder="Please enter your email."
        placeholderTextColor={theme.colors.gray}
        value={email}
        onChangeText={onChangeEmail}
        onSubmitEditing={onSubmitEmail}
      />
    </Container>
  );
}

export default memo(EmailInput);
