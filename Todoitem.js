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
      task: {
        isCompleted,
        id,
        text,
        isEdited,
        updateEditInputValue,
        editTodo,
        markTodo,
      },
      deleteTodo,
    } = this.props;
    return (
      <View>
        <CheckBox value={isCompleted} onValueChange={markTodo} />
        <Text>{text}</Text>
        {isEdited && (
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            defaultValue={text}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => updateEditInputValue(text)}
            className={isEdited ? '' : 'none'}
          />
        )}
        <Button
          color="black"
          title={isEdited ? '完成編輯' : '編輯'}
          onPress={editTodo}
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
