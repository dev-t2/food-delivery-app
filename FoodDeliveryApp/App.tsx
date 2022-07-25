/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { memo } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from '@emotion/native';

function HomeScreen() {
  return (
    <View>
      <TouchableHighlight>
        <Text>Home Screen</Text>
      </TouchableHighlight>
    </View>
  );
}

const DetailsScreenContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

function DetailsScreen() {
  return (
    <DetailsScreenContainer>
      <TouchableHighlight>
        <Text>Details Screen</Text>
      </TouchableHighlight>
    </DetailsScreenContainer>
  );
}

const { Navigator, Screen } = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home">
        <Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
        <Screen name="Details" component={DetailsScreen} />
      </Navigator>
    </NavigationContainer>
  );
}

export default memo(App);
