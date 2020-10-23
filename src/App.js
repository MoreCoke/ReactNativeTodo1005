import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import AsyncStorage from '@react-native-community/async-storage';
import {PortalExit, PortalProvider} from 'react-native-gateway';

import HomeScreen from './screen/Home';
import SplashScreen from './screen/Splash';
import Store from './stores';
import {delay} from './utils';

const Stack = createStackNavigator();

const App = function () {
  const [isHydrateLoading, setHydrateLoading] = useState(true);
  useEffect(() => {
    const init = async () => {
      await Promise.all([delay(2000), Store.init()]);
      setHydrateLoading(false);
      // await AsyncStorage.clear(); // 清空資料
    };
    init();
  }, []);
  return (
    <PortalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isHydrateLoading ? (
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <PortalExit />
    </PortalProvider>
  );
};

export default App;
