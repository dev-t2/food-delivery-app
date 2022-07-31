import React, { memo, Ref } from 'react';
import { TextInput } from 'react-native';
import styled from '@emotion/native';

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
    <StyledTextInput
      ref={emailRef}
      importantForAutofill="yes"
      clearButtonMode="while-editing"
      autoComplete="email"
      textContentType="emailAddress"
      keyboardType="email-address"
      returnKeyType="next"
      placeholder="이메일을 입력해주세요."
      blurOnSubmit={false}
      value={email}
      onChangeText={onChangeEmail}
      onSubmitEditing={onSubmitEmail}
    />
  );
}

export default memo(EmailInput);
