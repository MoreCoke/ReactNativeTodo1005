import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './screen/Home';
import Test from './screen/Test';
import Loading from './screen/Loading';
import {delay} from './utils';

const Tab = createBottomTabNavigator();

const App = function () {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const init = async () => {
      await delay(100);
      setLoading(true);
    };
    init();
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {isLoading ? (
          <Tab.Screen name="Home" component={Home} />
        ) : (
          <Tab.Screen name="Loading" component={Loading} />
        )}
        <Tab.Screen name="Test" component={Test} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
