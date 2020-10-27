import {observable, makeObservable, action} from 'mobx';
import {persist} from 'mobx-persist';

class GlobalStore {
  todos = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      updateTodos: action,
    });
  }

  updateTodos = (ts) => {
    this.todos = ts;
  };
}

const schema = {
  todos: {
    type: 'list',
    schema: {
      id: true,
      text: true,
      isCompleted: true,
      isEdited: false,
      editText: false,
    },
  },
};

const gs = new GlobalStore();
export default persist(schema)(gs);
