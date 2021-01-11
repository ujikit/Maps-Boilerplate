// In App.js in a new project

import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Root, Container} from 'native-base';

// screens
import TestMap from './src/screens/TestMap';

const Stack = createStackNavigator();

function App() {
  return (
    <Root>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="TestMap">
            <Stack.Screen
              name="TestMap"
              component={TestMap}
              />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

console.disableYellowBox = true;

export default App;
