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
      task,
      todoViewModel: {deleteTodo, markTodo, editTodo},
    } = this.props;
    const {isCompleted, id, text, todoItemViewModel} = task;
    return (
      <View>
        <CheckBox value={isCompleted} onValueChange={() => markTodo(id)} />
        <Text>{text}</Text>
        {todoItemViewModel.isEdited && (
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            defaultValue={text}
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
            deleteTodo(id);
          }}
        />
      </View>
    );
  }
}

export default TodoItem;
