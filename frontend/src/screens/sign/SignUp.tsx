import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { TextInput } from 'react-native';

import { Container } from '../../components/layouts';
import { EmailInput, NameInput, PasswordInput } from '../../components/inputs';
import { ContainedButton } from '../../components/buttons';

function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const nameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const isDisabled = useMemo(() => {
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return true;
    }

    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,16}$/.test(password)) {
      return true;
    }

    return false;
  }, [email, password]);

  const onChangeEmail = useCallback((text: string) => {
    setEmail(text.trim());
  }, []);

  const onSubmitEmail = useCallback(() => {
    nameRef.current?.focus();
  }, []);

  const onChangeName = useCallback((text: string) => {
    setName(text.trim());
  }, []);

  const onSubmitName = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  const onChangePassword = useCallback((text: string) => {
    setPassword(text.trim());
  }, []);

  const onSubmitPassword = useCallback(() => {
    if (!isDisabled) {
      console.log('onSignUp');
    }
  }, [isDisabled]);

  const onSignUp = useCallback(() => {
    console.log('onSignUp');
  }, []);

  return (
    <Container>
      <EmailInput email={email} onChangeEmail={onChangeEmail} onSubmitEmail={onSubmitEmail} />

      <NameInput
        nameRef={nameRef}
        name={name}
        onChangeName={onChangeName}
        onSubmitName={onSubmitName}
      />

      <PasswordInput
        passwordRef={passwordRef}
        password={password}
        onChangePassword={onChangePassword}
        onSubmitPassword={onSubmitPassword}
      />

      <ContainedButton isDisabled={isDisabled} text="Sign Up" onPress={onSignUp} />
    </Container>
  );
}

export default memo(SignUp);
