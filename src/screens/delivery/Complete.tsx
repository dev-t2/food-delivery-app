import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, ImageSourcePropType, useWindowDimensions } from 'react-native';
import { Image, openCamera, openPicker } from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import styled from '@emotion/native';

import { DeliveryScreenProp } from '../main';
import { CompleteScreenProps } from './index';
import { useAppDispatch } from '../../store';
import { useCompleteMutation } from '../../slices/order/orderApi';
import { resetOrder } from '../../slices/order/orderSlice';
import { Container } from '../../components/layout';
import { useNavigation } from '@react-navigation/native';

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

  const navigation = useNavigation<DeliveryScreenProp['navigation']>();

  const [complete, { isLoading, isSuccess, isError, error }] = useCompleteMutation();

  const dispatch = useAppDispatch();

  const [preview, setPreview] = useState<ImageSourcePropType>();
  const [resizedImage, setResizedImage] = useState<IResizedImage>();

  const isDisable = useMemo(() => {
    return !resizedImage || isLoading;
  }, [resizedImage, isLoading]);

  useEffect(() => {
    if (isSuccess) {
      Alert.alert('알림', '주문이 완료 처리 되었습니다.');

      dispatch(resetOrder());

      navigation.goBack();
      navigation.navigate('Settings');
    }

    if (isError && error) {
      if ('status' in error) {
        console.log(error.data);
      } else {
        console.error(error);
      }
    }
  }, [isSuccess, dispatch, navigation, isError, error]);

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
      saveToPhotos: true,
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

  const onComplete = useCallback(() => {
    const formData = new FormData();

    formData.append('orderId', route.params.orderId);
    formData.append('image', resizedImage);

    complete(formData);
  }, [route.params.orderId, resizedImage, complete]);

  return (
    <Container padding={20}>
      <StyledText>Order Number: {route.params.orderId}</StyledText>

      <PreviewContainer width={width}>
        {preview && <StyledImage resizeMode="contain" source={preview} />}
      </PreviewContainer>

      <ButtonContainer>
        <StyledPressable disabled={isLoading} onPress={onCamera}>
          <ButtonText>Camera</ButtonText>
        </StyledPressable>

        <StyledPressable disabled={isLoading} onPress={onGallery}>
          <ButtonText>Gallery</ButtonText>
        </StyledPressable>

        <StyledPressable disabled={isDisable} onPress={onComplete}>
          <ButtonText>Complete</ButtonText>
        </StyledPressable>
      </ButtonContainer>
    </Container>
  );
}

export default memo(Complete);
