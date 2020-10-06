import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {observer} from 'mobx-react';
import {makeObservable, observable, action} from 'mobx';

@observer
class TodoItem extends React.Component {
  editText = this.props.task.text;
  isEdited = false;

  constructor() {
    makeObservable(this, {
      editText: observable,
      isEdited: observable,
      updateEditInputValue: action,
      editTodo: action,
    });
  }

  updateEditInputValue = (evt) => {
    this.editText = evt.target.value;
  };

  editTodo = (id) => {
    const {editTodo} = this.props;
    editTodo(id, this.editText);
    this.isEdited = !this.isEdited;
  };

  render() {
    const {task, toggleBoolean, del} = this.props;
    return (
      <View>
        <CheckBox
          value={task.isCompleted}
          onValueChange={() => toggleBoolean(task.id)}
        />
        <Text>{task.text}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          defaultValue={task.text}
          onChangeText={(text) => this.updateEditInputValue(text)}
          className={this.isEdited ? '' : 'none'}
        />
        <Button
          color="black"
          title={this.isCompleted ? '完成編輯' : '編輯'}
          onPress={() => {
            this.editTodo(task.id);
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
