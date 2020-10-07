import {makeObservable, observable, action} from 'mobx';

export default class todoItemViewModel {
  text = '';
  editText = '';
  isEdited = false;
  isCompleted = false;
  id = Math.random();
  constructor(txt) {
    makeObservable(this, {
      editText: observable,
      text: observable,
      isEdited: observable,
      isCompleted: observable,
      updateEditInputValue: action,
      editTodo: action,
      markTodo: action,
    });
    this.text = txt;
  }

  updateEditInputValue = (text) => {
    this.editText = text;
  };

  editTodo = () => {
    if (this.editText) {
      this.text = this.editText;
    }
    this.isEdited = !this.isEdited;
  };

  markTodo = () => {
    this.isCompleted = !this.isCompleted;
  };
}
