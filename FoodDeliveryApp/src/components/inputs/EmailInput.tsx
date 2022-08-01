import React, { memo, Ref } from 'react';
import { TextInput } from 'react-native';
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
  emailRef: Ref<TextInput>;
  email: string;
  onChangeEmail: (text: string) => void;
  onSubmitEmail: () => void;
}

function EmailInput({ emailRef, email, onChangeEmail, onSubmitEmail }: IEmailInput) {
  return (
    <Container>
      <StyledText>Email</StyledText>

      <StyledTextInput
        ref={emailRef}
        importantForAutofill="yes"
        clearButtonMode="while-editing"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        returnKeyType="next"
        placeholder="Please enter your email."
        blurOnSubmit={false}
        value={email}
        onChangeText={onChangeEmail}
        onSubmitEditing={onSubmitEmail}
      />
    </Container>
  );
}

export default memo(EmailInput);
