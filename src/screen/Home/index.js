import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TodoListScreen from './TodoList';
import EditScreen from '../Edit';
import TestScreen from './Test';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TodoList"
        component={TodoListScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}

export default function () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Test" component={TestScreen} />
    </Tab.Navigator>
  );
}
