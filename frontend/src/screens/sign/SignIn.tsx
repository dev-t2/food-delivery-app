import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { SignInScreenProps } from './index';
import { Container } from '../../components/layouts';
import { EmailInput, PasswordInput } from '../../components/inputs';
import { ContainedButton, TextButton } from '../../components/buttons';

function SignIn({ navigation }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef<TextInput>(null);

  const isDisabled = useMemo(() => !email || !password, [email, password]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const onSubmitEmail = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onSignIn = useCallback(() => {
    console.log('onSignIn');
  }, []);

  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <Container>
      <EmailInput email={email} onChangeEmail={onChangeEmail} onSubmitEmail={onSubmitEmail} />

      <PasswordInput
        passwordRef={passwordRef}
        password={password}
        onChangePassword={onChangePassword}
        onSubmitPassword={onSignIn}
      />

      <ContainedButton isDisabled={isDisabled} text="Sign In" onPress={onSignIn} />

      <TextButton text="Sign Up" onPress={onSignUp} />
    </Container>
  );
}

export default memo(SignIn);
