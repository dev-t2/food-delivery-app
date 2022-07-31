import React, { memo, Ref } from 'react';
import { TextInput } from 'react-native';
import styled from '@emotion/native';

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
  return (
    <StyledTextInput
      ref={passwordRef}
      importantForAutofill="yes"
      clearButtonMode="while-editing"
      autoComplete="password"
      textContentType="password"
      secureTextEntry
      returnKeyType="done"
      placeholder="비밀번호를 입력해주세요."
      value={password}
      onChangeText={onChangePassword}
      onSubmitEditing={onSubmitPassword}
    />
  );
}

export default memo(PasswordInput);
