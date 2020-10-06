import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {observer} from 'mobx-react';
import {makeObservable, observable, action} from 'mobx';

@observer
class TodoItem extends React.Component {
  editText = '';
  isEdited = false;
  constructor() {
    super();
    makeObservable(this, {
      editText: observable,
      isEdited: observable,
      updateEditInputValue: action,
      editTodo: action,
    });
  }

  updateEditInputValue = (text) => {
    this.editText = text;
  };

  editTodo = (id) => {
    const {editTodo} = this.props;
    if (!this.editText) {
      this.editText = this.props.task.text;
    }
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
        {this.isEdited && (
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            defaultValue={task.text}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => this.updateEditInputValue(text)}
            className={this.isEdited ? '' : 'none'}
          />
        )}
        <Button
          color="black"
          title={this.isEdited ? '完成編輯' : '編輯'}
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
