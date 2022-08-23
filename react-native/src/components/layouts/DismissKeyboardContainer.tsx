import React, { memo, ReactNode, useCallback } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from '@emotion/native';

const StyledKeyboardAwareScrollView = styled(KeyboardAwareScrollView)({
  padding: 20,
});

interface IDismissKeyboardContainer {
  children: ReactNode;
}

function DismissKeyboardContainer({ children }: IDismissKeyboardContainer) {
  const onPress = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <TouchableWithoutFeedback accessible={false} onPress={onPress}>
      <StyledKeyboardAwareScrollView>{children}</StyledKeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

export default memo(DismissKeyboardContainer);
