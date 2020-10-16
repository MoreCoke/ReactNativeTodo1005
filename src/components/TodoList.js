import React from 'react';
import {observer} from 'mobx-react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import TodoItem from './Todoitem';
import TodoViewModel from '../viewModels/todoViewModel';

const todoViewModel = new TodoViewModel();

@observer
class TodoList extends React.Component {
  componentDidMount() {
    todoViewModel.appInit();
  }

  componentWillUnmount() {
    todoViewModel.appDie();
  }

  renderListHeader = observer(() => (
    <View style={styles.headerView}>
      <View style={styles.sectionContainer}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          value={todoViewModel.addText}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => todoViewModel.updateAddInputValue(text)}
        />
        <Button color="black" title="新增" onPress={todoViewModel.addTodo} />
      </View>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'center',
          },
          styles.sectionContainer,
        ]}>
        <Button color="black" title="全部" onPress={todoViewModel.allTodo} />
        <Button
          color="black"
          title="已完成"
          onPress={todoViewModel.allDoneTodo}
        />
      </View>
    </View>
  ));

  renderListFooter = observer(() => (
    <>
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
            justifyContent: 'center',
          },
          styles.sectionContainer,
        ]}>
        <Button color="black" title="載入更多" onPress={todoViewModel.query} />
      </View>
    </>
  ));

  render() {
    return (
      <FlatList
        style={styles.sectionContainer}
        data={todoViewModel.todoItems}
        ListHeaderComponent={this.renderListHeader}
        ListFooterComponent={this.renderListFooter}
        stickyHeaderIndices={[0]}
        keyExtractor={(element) => element.id.toString()}
        renderItem={({item}) => (
          <TodoItem
            task={item}
            deleteTodo={todoViewModel.deleteTodo}
            key={item.id}
          />
        )}
      />
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
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    fontWeight: '700',
  },
  loading: {
    width: 100,
    height: 100,
  },
});

export default TodoList;
