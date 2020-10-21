import React from 'react';
import {StatusBar, SafeAreaView, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TodoList from '../components/TodoList';
import EditScreen from './Edit';
import TestScreen from './Test';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <View>
          <TodoList />
        </View>
      </SafeAreaView>
    </>
  );
}

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
});

export default function () {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Test" component={TestScreen} />
    </Tab.Navigator>
  );
}
