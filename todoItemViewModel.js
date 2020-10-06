import {makeObservable, observable, action} from 'mobx';

export default class todoItemViewModel {
  editText = '';
  isEdited = false;
  constructor() {
    makeObservable(this, {
      editText: observable,
      isEdited: observable,
      updateEditInputValue: action,
      editTodo: action,
    });
  }

  updateEditInputValue = (text) => {
    this.editText = text;
  };

  editTodo = (task, cb) => {
    if (!this.editText) {
      this.editText = task.text;
    }
    cb(task.id, this.editText);
    this.isEdited = !this.isEdited;
  };
}
