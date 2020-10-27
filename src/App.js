import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PortalExit, PortalProvider} from 'react-native-gateway';

import HomeScreen from './screen/Home';
import SplashScreen from './screen/Splash';

const Stack = createStackNavigator();

const App = function () {
  return (
    <PortalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <PortalExit />
    </PortalProvider>
  );
};

export default App;
