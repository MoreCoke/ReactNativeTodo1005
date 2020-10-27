import React from 'react';
import {SafeAreaView, View, Button, StyleSheet} from 'react-native';

export default function Test({navigation}) {
  return (
    <SafeAreaView style={styles.safeAreaLayout}>
      <View>
        <Button title="回上頁" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaLayout: {flex: 1},
});
