import {makeObservable, observable, action} from 'mobx';
import {persist} from 'mobx-persist';

export default class todoItemViewModel {
  @persist @observable text = '';
  @persist @observable editText = '';
  @persist @observable isEdited = false;
  @persist @observable isCompleted = false;
  id = Math.random();
  constructor(txt) {
    makeObservable(this);
    this.text = txt;
  }

  @action updateEditInputValue = (text) => {
    this.editText = text;
  };

  @action editTodo = () => {
    if (this.editText) {
      this.text = this.editText;
    }
    this.isEdited = !this.isEdited;
  };

  @action markTodo = () => {
    this.isCompleted = !this.isCompleted;
  };
}
