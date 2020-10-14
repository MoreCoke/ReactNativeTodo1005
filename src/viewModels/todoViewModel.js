import {
  action,
  computed,
  observable,
  reaction,
  runInAction,
  makeObservable,
} from 'mobx';

import {delay, fakeData} from '../utils';
import TodoItemViewModel from './todoItemViewModel';
import GlobalStore from '../stores/global';

export const todosPerPage = 5;

export default class todoViewModel {
  @observable todos = [];
  @observable addText = '';
  @observable allCompleted = false;
  @observable loading = false;
  page = 1;
  logReaction = null;

  @computed get todoItems() {
    return this.todos.filter((element) =>
      this.allCompleted ? element['isCompleted'] : true,
    );
  }

  constructor() {
    makeObservable(this);
  }

  @action updateAddInputValue = (text) => {
    this.addText = text;
  };

  @action addTodo = () => {
    const todo = new TodoItemViewModel({text: this.addText});
    if (this.addText) {
      this.todos.unshift(todo);
    }
    this.addText = '';
  };

  @action deleteTodo = (id) => {
    this.todos = this.todos.filter((element) => element['id'] !== id);
  };

  @action allTodo = () => {
    this.allCompleted = false;
  };

  @action allDoneTodo = () => {
    this.allCompleted = true;
  };

  @action query = async () => {
    this.loading = true;
    const list = await delay(500).then(() => {
      const pageTodoStart = (this.page - 1) * 5;
      const pageTodoEnd = this.page * todosPerPage;
      return fakeData
        .slice(pageTodoStart, pageTodoEnd)
        .map((elemnt) => new TodoItemViewModel({text: elemnt.text}));
    });

    if (list.length > 0) {
      this.page += 1;
    }

    runInAction(() => {
      this.todos = this.todos.concat(list);
      this.loading = false;
    });
  };

  @action appInit = () => {
    // restore
    this.todos = GlobalStore.todos.map((t) => new TodoItemViewModel(t));
    this.logReaction = reaction(
      () => this.todos.length,
      () => {
        // update stores
        GlobalStore.updateTodos(this.todos);
        console.log('this.todos: ', this.todos);
      },
    );

    // this.query(); // comment out for testing store / restore `todos`.

    // this.query();
    // this.logReaction = reaction(
    //   () => this.todos.map((element) => element.text),
    //   (text) => console.log(text),
    // );
  };

  appDie = () => {
    this.logReaction();
  };
}
