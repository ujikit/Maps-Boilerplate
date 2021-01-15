// In App.js in a new project

import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {Root, Container} from 'native-base';

// screens
import SplashScreen from './src/screens/SplashScreen';
import Home from './src/screens/Home';
import Destination from './src/screens/Destination';
import ChooseLocation from './src/screens/ChooseLocation';
import MonitorDriver from './src/screens/MonitorDriver';
import ChooseData from './src/screens/ChooseData';
import TestMap from './src/screens/TestMap';
// config
import {store} from './src/states/store/store';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <Root>
        <View style={styles.container}>
          <StatusBar
            barStyle="dark-content"
          />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="Destination"
                component={Destination}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="ChooseLocation"
                component={ChooseLocation}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="MonitorDriver"
                component={MonitorDriver}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name="ChooseData"
                component={ChooseData}
                options={{
                  title: 'Pilih Kendaraan'
                }}
              />
              <Stack.Screen
                name="TestMap"
                component={TestMap}
                options={{
                  title: 'Pilih Kendaraan'
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Root>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

console.disableYellowBox = true;

export default App;
