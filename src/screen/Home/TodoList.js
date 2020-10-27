import React from 'react';
import {StatusBar, SafeAreaView, View, StyleSheet} from 'react-native';

import TodoList from '../../components/TodoList';

export default function TodoListScreen() {
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

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
});
