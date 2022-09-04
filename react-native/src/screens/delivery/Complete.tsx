import React, { memo, useCallback, useState } from 'react';
import { ImageSourcePropType, useWindowDimensions } from 'react-native';
import { Image, openCamera, openPicker } from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import styled from '@emotion/native';

import { CompleteScreenProps } from './index';
import { Container } from '../../components/layout';

const StyledText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.colors.black,
}));

interface IPreviewContainer {
  width: number;
}

const PreviewContainer = styled.View<IPreviewContainer>(({ theme, width }) => ({
  width: width - 40,
  height: width - 40,
  backgroundColor: theme.colors.gray,
  marginTop: 20,
}));

const StyledImage = styled.Image({
  flex: 1,
});

const ButtonContainer = styled.View({
  flexDirection: 'row',
  marginTop: 20,
});

const StyledPressable = styled.Pressable(({ theme, disabled }) => ({
  flex: 1,
  alignItems: 'center',
  padding: 10,
  backgroundColor: disabled ? theme.colors.gray : theme.colors.blue,
  borderRadius: 4,
  marginHorizontal: 10,
}));

const ButtonText = styled.Text(({ theme }) => ({
  fontSize: 12,
  fontWeight: 'bold',
  color: theme.colors.white,
}));

interface IResizedImage {
  uri: string;
  type: string;
  name: string;
}

function Complete({ route }: CompleteScreenProps) {
  const { width } = useWindowDimensions();

  const [preview, setPreview] = useState<ImageSourcePropType>();
  const [resizedImage, setResizedImage] = useState<IResizedImage>();

  const onImage = useCallback(({ data, mime, path }: Image) => {
    setPreview({ uri: `data:${mime};base64,${data}` });

    ImageResizer.createResizedImage(
      path,
      600,
      600,
      mime.includes('jpeg') ? 'JPEG' : 'PNG',
      100,
    ).then(({ uri, name }) => {
      setResizedImage({ uri, name, type: mime });
    });
  }, []);

  const onCamera = useCallback(() => {
    openCamera({
      mediaType: 'photo',
      includeExif: true,
      includeBase64: true,
    })
      .then(onImage)
      .catch(console.error);
  }, [onImage]);

  const onGallery = useCallback(() => {
    openPicker({
      mediaType: 'photo',
      includeExif: true,
      includeBase64: true,
    })
      .then(onImage)
      .catch(console.error);
  }, [onImage]);

  const onComplete = useCallback(() => {}, []);

  return (
    <Container padding={20}>
      <StyledText>Order Number: {route.params.orderId}</StyledText>

      <PreviewContainer width={width}>
        {preview && <StyledImage resizeMode="contain" source={preview} />}
      </PreviewContainer>

      <ButtonContainer>
        <StyledPressable onPress={onCamera}>
          <ButtonText>Camera</ButtonText>
        </StyledPressable>

        <StyledPressable onPress={onGallery}>
          <ButtonText>Gallery</ButtonText>
        </StyledPressable>

        <StyledPressable disabled={!resizedImage} onPress={onComplete}>
          <ButtonText>Complete</ButtonText>
        </StyledPressable>
      </ButtonContainer>
    </Container>
  );
}

export default memo(Complete);
