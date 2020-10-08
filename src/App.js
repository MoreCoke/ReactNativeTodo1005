import React from 'react';
import {observer} from 'mobx-react';
import {makeObservable, observable, runInAction} from 'mobx';
import {SafeAreaView, StyleSheet, View, StatusBar} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import TodoList, {init} from './components/TodoList';

@observer
class App extends React.Component {
  @observable isHydrateFinished = false;

  constructor() {
    super();
    makeObservable(this);
  }

  async componentDidMount() {
    await init.then(() => {
      runInAction(() => (this.isHydrateFinished = true));
    });
    // await AsyncStorage.clear(); //清空資料
  }

  render() {
    return (
      this.isHydrateFinished && (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <View style={styles.body}>
              {this.isHydrateFinished && <TodoList />}
            </View>
          </SafeAreaView>
        </>
      )
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 100,
    height: 100,
  },
});

export default App;
