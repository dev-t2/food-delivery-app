/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { memo, useMemo } from 'react';
import { Pressable, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from '@emotion/native';

const Container = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

function HomeScreen() {
  return (
    <Container>
      <Pressable>
        <Text>Home Screen</Text>
      </Pressable>
    </Container>
  );
}

function DetailsScreen() {
  return (
    <Container>
      <Pressable>
        <Text>Details Screen</Text>
      </Pressable>
    </Container>
  );
}

const { Navigator, Screen } = createNativeStackNavigator();

function App() {
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
}

export default memo(App);
