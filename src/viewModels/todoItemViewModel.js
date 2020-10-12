import {makeObservable, observable, action} from 'mobx';

export default class todoItemViewModel {
  @observable text = '';
  @observable editText = '';
  @observable isEdited = false;
  @observable isCompleted = false;
  constructor(item) {
    makeObservable(this);
    this.text = item.text || '';
    this.id = item.id || Math.random();
    this.isCompleted = item.isCompleted || false;
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
