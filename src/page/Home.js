import React from 'react';
import {StatusBar, SafeAreaView, View, StyleSheet} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import {observer} from 'mobx-react';
import {makeObservable, observable, runInAction} from 'mobx';

import Stores from '../stores';
import TodoList from '../components/TodoList';
import Store from '../stores';

@observer
class Home extends React.Component {
  @observable isHydrateFinished = false;

  constructor(props) {
    super(props);
    makeObservable(this);
  }

  async componentDidMount() {
    await Stores.init().then(() => {
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

export default Home;
