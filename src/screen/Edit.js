/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Button,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import {observer} from 'mobx-react';
import {PortalEnter, PortalExit, PortalProvider} from 'react-native-gateway';

const Edit = observer(({route, navigation}) => {
  const {
    params: {id, text, editTodo, updateEditInputValue, deleteTodo},
  } = route;
  const [isShow, setIsShow] = useState(false);

  return (
    <PortalProvider>
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <TextInput
            style={styles.updateEDitInput}
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
        </View>
        <PortalEnter name="modal">
          {isShow && (
            <View style={styles.modalOutside}>
              <View style={styles.modalInside}>
                <Text style={styles.delText}>確定刪除？</Text>
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
          )}
        </PortalEnter>
        <PortalExit />
      </SafeAreaView>
    </PortalProvider>
  );
});

const styles = StyleSheet.create({
  updateEDitInput: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  modalOutside: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInside: {
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
  },
  delText: {textAlign: 'center', fontSize: 20, paddingBottom: 16},
});

export default Edit;
