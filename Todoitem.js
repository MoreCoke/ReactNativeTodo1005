import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {observer} from 'mobx-react';
import TodoItemViewModel from './todoItemViewModel';

const todoItemViewModel = new TodoItemViewModel();

@observer
class TodoItem extends React.Component {
  constructor() {
    super();
  }
  render() {
    const {task, toggleBoolean, del, editTodo} = this.props;
    return (
      <View>
        <CheckBox
          value={task.isCompleted}
          onValueChange={() => toggleBoolean(task.id)}
        />
        <Text>{task.text}</Text>
        {todoItemViewModel.isEdited && (
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            defaultValue={task.text}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) =>
              todoItemViewModel.updateEditInputValue(text)
            }
            className={todoItemViewModel.isEdited ? '' : 'none'}
          />
        )}
        <Button
          color="black"
          title={todoItemViewModel.isEdited ? '完成編輯' : '編輯'}
          onPress={() => {
            todoItemViewModel.editTodo(task, editTodo);
          }}
        />
        <Button
          color="black"
          title="刪除"
          onPress={() => {
            del(task.id);
          }}
        />
      </View>
    );
  }
}

export default TodoItem;
