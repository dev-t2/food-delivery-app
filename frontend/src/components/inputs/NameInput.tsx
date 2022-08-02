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

interface INameInput {
  nameRef: Ref<TextInput>;
  name: string;
  onChangeName: (text: string) => void;
  onSubmitName: () => void;
}

function NameInput({ nameRef, name, onChangeName, onSubmitName }: INameInput) {
  const theme = useTheme();

  return (
    <Container>
      <StyledText>Name</StyledText>

      <StyledTextInput
        ref={nameRef}
        clearButtonMode="while-editing"
        autoComplete="name"
        textContentType="name"
        returnKeyType="next"
        blurOnSubmit={false}
        placeholder="Please enter your name."
        placeholderTextColor={theme.colors.gray}
        value={name}
        onChangeText={onChangeName}
        onSubmitEditing={onSubmitName}
      />
    </Container>
  );
}

export default memo(NameInput);
