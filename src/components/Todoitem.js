import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import {observer} from 'mobx-react';

@observer
class TodoItem extends React.Component {
  constructor() {
    super();
  }
  render() {
    const {task, deleteTodo, navigation} = this.props;
    return (
      <View>
        <View style={styles.titleLayout}>
          <CheckBox
            style={styles.titleCheckBox}
            value={task.isCompleted}
            onValueChange={task.markTodo}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Edit', {
                id: task.id,
                text: task.text,
                isEdited: task.isEdited,
                updateEditInputValue: task.updateEditInputValue,
                editTodo: task.editTodo,
                deleteTodo,
              })
            }>
            <Text style={styles.title}>{task.text}</Text>
          </TouchableOpacity>
        </View>
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
  titleCheckBox: {marginRight: 16},
});

export default function (props) {
  const navigation = useNavigation();
  return <TodoItem {...props} navigation={navigation} />;
}
