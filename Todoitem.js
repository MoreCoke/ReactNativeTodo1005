import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {observer} from 'mobx-react';

@observer
class TodoItem extends React.Component {
  constructor() {
    super();
  }
  render() {
    const {
      // task 解構優化？
      task,
      todoViewModel: {deleteTodo, markTodo, editTodo},
    } = this.props;
    return (
      <View>
        <CheckBox
          value={task.isCompleted}
          onValueChange={() => markTodo(task.id)}
        />
        <Text>{task.text}</Text>
        {task.todoItemViewModel.isEdited && (
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            defaultValue={task.text}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) =>
              task.todoItemViewModel.updateEditInputValue(text)
            }
            className={task.todoItemViewModel.isEdited ? '' : 'none'}
          />
        )}
        <Button
          color="black"
          title={task.todoItemViewModel.isEdited ? '完成編輯' : '編輯'}
          onPress={() => {
            task.todoItemViewModel.editTodo(task, editTodo);
          }}
        />
        <Button
          color="black"
          title="刪除"
          onPress={() => {
            deleteTodo(task.id);
          }}
        />
      </View>
    );
  }
}

export default TodoItem;
