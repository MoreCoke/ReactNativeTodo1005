import {Component} from 'react';
import {BackHandler} from 'react-native';

export default class Navigation extends Component {
  constructor() {
    super();
    this.onScreenEnter = this.onScreenEnter.bind(this);
    this.onScreenLeave = this.onScreenEnter.bind(this);
    this.onAndroidBack = this.onAndroidBack.bind(this);
  }
  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener('focus', this.onScreenEnter);
    navigation.addListener('blur', this.onScreenLeave);
    BackHandler.addEventListener('hardwareBackPress', this.onAndroidBack);
  }

  componentWillUnmount() {
    const {navigation} = this.props;
    navigation.removeListener('focus', this.onScreenEnter);
    navigation.removeListener('blur', this.onScreenLeave);
    BackHandler.removeEventListener('hardwareBackPress', this.onAndroidBack);
  }

  onScreenEnter() {
    console.log('Navigation onScreenEnter');
  }

  onScreenLeave() {
    console.log('Navigation onScreenLeave');
  }

  onAndroidBack() {
    console.log('Navigation onAndroidBack');
  }
}
