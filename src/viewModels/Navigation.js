import {Component} from 'react';
import {BackHandler} from 'react-native';
import {delay} from '../utils';

export default class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      isShow: false,
      isLoading: true,
    };
  }
  componentDidMount() {
    this.onScreenEnter();
    this.onScreenLeave();
    this.onAndroidBack();
  }

  componentWillUnmount() {
    this.unScreenEnter();
    this.unScreenLeave();
    this.unAndroidBack();
  }

  openLoading = async () => {
    await delay(500);
    this.setState({isLoading: false});
  };

  closeLoading = () => {
    this.setState({isLoading: true});
  };

  openShow = () => {
    this.setState({isShow: true});
  };

  closeShow = () => {
    this.setState({isShow: false});
  };

  sayGoodBye = () => {
    console.log('Bye');
  };

  onScreenEnter = () => {
    const {navigation} = this.props;
    navigation.addListener('focus', this.openLoading);
  };

  onScreenLeave = () => {
    const {navigation} = this.props;
    navigation.addListener('blur', this.sayGoodBye);
  };

  unScreenEnter = () => {
    const {navigation} = this.props;
    navigation.removeListener('focus', this.openLoading);
  };

  unScreenLeave = () => {
    const {navigation} = this.props;
    navigation.removeListener('blur', this.sayGoodBye);
  };

  handleAndroidBack = () => {
    if (this.state.isShow) {
      this.setState({isShow: false});
      return true;
    }
  };

  onAndroidBack() {
    BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBack);
  }

  unAndroidBack() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleAndroidBack,
    );
  }
}
