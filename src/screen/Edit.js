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
import {PortalEnter} from 'react-native-gateway';
import {delay} from '../utils';

const Edit = observer(({route, navigation}) => {
  const {params} = route;
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setLoading] = useState(true);
  React.useEffect(() => {
    const loading = navigation.addListener('focus', async () => {
      await delay(500);
      setLoading(!isLoading);
    });
    const leave = navigation.addListener('blur', () => console.log('bye'));
    return () => {
      loading();
      leave();
    };
  });
  return (
    <SafeAreaView style={styles.viewCenter}>
      {isLoading ? (
        <View>
          <Text style={styles.loadingText}>Loading</Text>
        </View>
      ) : (
        <View>
          <TextInput
            style={styles.updateEDitInput}
            defaultValue={params.text}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={params.updateEditInputValue}
          />

          <Button
            color="black"
            title="完成編輯"
            onPress={() => {
              params.editTodo();
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
      )}
      <PortalEnter name="modal">
        {isShow && (
          <View style={styles.modalOutside}>
            <View style={styles.modalInside}>
              <Text style={styles.delText}>確定刪除？</Text>
              <Button
                title="確定"
                onPress={() => {
                  params.deleteTodo(params.id);
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
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  viewCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 50,
  },
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
