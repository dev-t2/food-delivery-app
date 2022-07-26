/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, Text } from 'react-native';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from '@emotion/native';

const Container = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const onPress = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);

  return (
    <Container>
      <Pressable onPress={onPress}>
        <Text>Home Screen</Text>
      </Pressable>
    </Container>
  );
};

const DetailsScreen = ({ navigation }: DetailsScreenProps) => {
  const onPress = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <Container>
      <Pressable onPress={onPress}>
        <Text>Details Screen</Text>
      </Pressable>
    </Container>
  );
};

const { Navigator, Screen } = createNativeStackNavigator();

const App = () => {
  const HomeScreenOptions = useMemo(() => {
    return { title: 'Overview' };
  }, []);

  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen name="Home" component={HomeScreen} options={HomeScreenOptions} />
        <Screen name="Details" component={DetailsScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default memo(App);
