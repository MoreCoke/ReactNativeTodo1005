import React, {useEffect} from 'react';
import {SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Store from '../../stores';
import {delay} from '../../utils';

function Splash({navigation}) {
  useEffect(() => {
    const init = async () => {
      await Promise.all([delay(2000), Store.init()]);
      // await AsyncStorage.clear(); // 清空資料
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    };
    init();
  }, [navigation]);
  return (
    <SafeAreaView style={styles.loadingLayout}>
      <View>
        <Text style={styles.loadingText}>LOADING</Text>
        <Image
          style={styles.loading}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
            // "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin: auto; display: block; shape-rendering: auto;' width='100px' height='100px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Ccircle cx='50' cy='50' r='32' stroke-width='8' stroke='%231d3f72' stroke-dasharray='50.26548245743669 50.26548245743669' fill='none' stroke-linecap='round'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' keyTimes='0;1' values='0 50 50;360 50 50'%3E%3C/animateTransform%3E%3C/circle%3E%3C/svg%3E",
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    width: 100,
    height: 100,
  },
  loadingLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 50,
  },
});

export default Splash;
