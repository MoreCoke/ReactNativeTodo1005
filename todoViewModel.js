import {
  action,
  computed,
  observable,
  reaction,
  runInAction,
  makeObservable,
} from 'mobx';
import {persist} from 'mobx-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {create} from 'mobx-persist';

import {delay, fakeData} from './utils';
import TodoItemViewModel from './todoItemViewModel';

export const todosPerPage = 5;

const hydrate = create({
  storage: AsyncStorage,
});
hydrate('todoViewModel', todoViewModel).then(() =>
  console.log('todoViewModel has been hydrated'),
);

export default class todoViewModel {
  @persist('list', TodoItemViewModel) @observable todos = [];
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
    const todo = new TodoItemViewModel(this.addText);
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
        .map((elemnt) => new TodoItemViewModel(elemnt.text));
    });

    if (list.length > 0) {
      this.page += 1;
    }

    runInAction(() => {
      this.todos = this.todos.concat(list);
      this.loading = false;
    });
  };

  appInit = () => {
    this.query();
    this.logReaction = reaction(
      () => this.todos.map((element) => element.text),
      (text) => console.log(text),
    );
  };

  appDie = () => {
    this.logReaction();
  };
}
