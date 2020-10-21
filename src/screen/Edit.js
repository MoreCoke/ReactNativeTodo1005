/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView, View, Button, TextInput, Modal, Text} from 'react-native';
import {observer} from 'mobx-react';

const Edit = observer(({route, navigation}) => {
  const {
    params: {id, text, editTodo, updateEditInputValue, deleteTodo},
  } = route;
  const [isShow, setIsShow] = useState(false);
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <TextInput
          style={{
            width: 200,
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          defaultValue={text}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={updateEditInputValue}
        />

        <Button
          color="black"
          title="完成編輯"
          onPress={() => {
            editTodo();
            navigation.goBack();
          }}
        />
        <Button
          color="black"
          title="刪除"
          onPress={() => {
            setIsShow(!isShow);
          }}
        />
        <Modal transparent={true} visible={isShow}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                margin: 20,
                padding: 15,
                width: 200,
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowRadius: 4,
              }}>
              <Text
                style={{textAlign: 'center', fontSize: 20, paddingBottom: 16}}>
                確定刪除？
              </Text>
              <Button
                title="確定"
                onPress={() => {
                  deleteTodo(id);
                  navigation.goBack();
                }}
              />
              <Button
                title="取消"
                onPress={() => {
                  setIsShow(!isShow);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
});

export default Edit;
