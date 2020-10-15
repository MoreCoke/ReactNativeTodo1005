import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {makeObservable, observable, runInAction} from 'mobx';
import {SafeAreaView, StyleSheet, View, StatusBar, Button} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Stores from './stores';
import TodoList from './components/TodoList';

const Tab = createBottomTabNavigator();

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
    // await AsyncStorage.clear(); //清空資料
  }

  render() {
    console.log('the props from react navigation', this.props);
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            {this.isHydrateFinished && <TodoList />}
            <Button
              title="切換頁面"
              onPress={() => this.props.navigation.navigate('Test')}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

function Test({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Button title="回上頁" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Test" component={Test} />
      </Tab.Navigator>
    </NavigationContainer>
  );
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
