import React from 'react';
import {StatusBar, SafeAreaView, View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
// import AsyncStorage from '@react-native-community/async-storage';
import {observer} from 'mobx-react';
import {makeObservable, observable, runInAction} from 'mobx';

import TodoList from '../components/TodoList';
import Store from '../stores';
import EditPage from './Edit';

const Stack = createStackNavigator();

@observer
class HomePage extends React.Component {
  @observable isHydrateFinished = false;

  constructor(props) {
    super(props);
    makeObservable(this);
  }

  async componentDidMount() {
    await Store.init().then(() => {
      runInAction(() => (this.isHydrateFinished = true));
    });
    // await AsyncStorage.clear(); // 清空資料
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.body}>
          <View>{this.isHydrateFinished && <TodoList />}</View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
  },
});

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Edit" component={EditPage} />
    </Stack.Navigator>
  );
}
export default Home;
