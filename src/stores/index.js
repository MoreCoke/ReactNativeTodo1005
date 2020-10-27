import AsyncStorage from '@react-native-community/async-storage';
import {create} from 'mobx-persist';

import GlobalStore from './global';

const hydrate = create({
  storage: AsyncStorage,
});

class Store {
  static initialize = Promise.all([hydrate('global', GlobalStore)]);

  static async init() {
    return this.initialize;
  }
}

export default Store;
