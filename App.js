/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {observer} from 'mobx-react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  Image,
  FlatList,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

import TodoItem from './Todoitem';
import TodoViewModel from './todoViewModel';

const todoViewModel = new TodoViewModel();

@observer
class App extends React.Component {
  componentDidMount() {
    todoViewModel.appInit();
  }

  componentWillUnmount() {
    todoViewModel.appDie();
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView>
            <View style={styles.body}>
              <Header />
              {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
              )}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change
                  this screen and then come back to see your edits.
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <TextInput
                  style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                  }}
                  value={todoViewModel.text}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(text) =>
                    todoViewModel.updateAddInputValue(text)
                  }
                />
                <Button
                  color="black"
                  title="新增"
                  onPress={todoViewModel.addTodo}
                />
              </View>
              <View style={styles.sectionContainer}>
                <FlatList
                  data={todoViewModel.todoItems}
                  keyExtractor={(element) => element['id'].toString()}
                  renderItem={({item}) => (
                    <TodoItem
                      task={item}
                      del={() => todoViewModel.deleteTodo(item['id'])}
                      toggleBoolean={() => todoViewModel.markTodo(item['id'])}
                      editTodo={todoViewModel.editTodo}
                      key={item['id']}
                    />
                  )}
                />
              </View>
              {todoViewModel.loading && (
                <View style={[styles.sectionContainer, styles.sectionCenter]}>
                  <Image
                    style={styles.loading}
                    source={{
                      uri: 'https://reactnative.dev/img/tiny_logo.png',
                      // "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin: auto; display: block; shape-rendering: auto;' width='100px' height='100px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Ccircle cx='50' cy='50' r='32' stroke-width='8' stroke='%231d3f72' stroke-dasharray='50.26548245743669 50.26548245743669' fill='none' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' keyTimes='0;1' values='0 50 50;360 50 50'%3E%3C/animateTransform%3E%3C/circle%3E%3C/svg%3E",
                    }}
                  />
                </View>
              )}
              <View
                style={[
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                  styles.sectionContainer,
                ]}>
                <Button
                  color="black"
                  title="全部"
                  onPress={todoViewModel.allTodo}
                />
                <Button
                  color="black"
                  title="已完成"
                  onPress={todoViewModel.allDoneTodo}
                />
                <Button
                  color="black"
                  title="載入更多"
                  onPress={todoViewModel.query}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  loading: {
    width: 100,
    height: 100,
  },
});

export default App;
