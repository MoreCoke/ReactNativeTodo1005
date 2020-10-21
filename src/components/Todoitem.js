/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, Link} from '@react-navigation/native';
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
      navigation,
    } = this.props;
    return (
      <View>
        <View style={styles.titleLayout}>
          <CheckBox
            style={{marginRight: 16}}
            value={isCompleted}
            onValueChange={markTodo}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Edit', {
                id,
                text,
                isEdited,
                updateEditInputValue,
                editTodo,
                deleteTodo,
              })
            }>
            <Text style={styles.title}>{text}</Text>
          </TouchableOpacity>
          {/* <Link style={styles.title} to={`/Edit/${id}`}>
            {text}
          </Link> */}
        </View>
        {false && isEdited && (
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            defaultValue={text}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => updateEditInputValue(text)}
            className={isEdited ? '' : 'none'}
          />
        )}
        {false && (
          <Button
            color="black"
            title={isEdited ? '完成編輯' : '編輯'}
            onPress={editTodo}
          />
        )}
        {false && (
          <Button
            color="black"
            title="刪除"
            onPress={() => {
              deleteTodo(id);
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleLayout: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
  },
});

export default function (props) {
  const navigation = useNavigation();
  return <TodoItem {...props} navigation={navigation} />;
}
