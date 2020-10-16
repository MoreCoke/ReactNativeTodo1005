import React from 'react';
import {SafeAreaView, View, Button} from 'react-native';

export default function Test({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Button title="回上頁" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}
