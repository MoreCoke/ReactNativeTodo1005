import {
  action,
  computed,
  observable,
  reaction,
  runInAction,
  makeObservable,
} from 'mobx';
import {delay, fakeData} from './utils';
import TodoItemViewModel from './todoItemViewModel';

export const todosPerPage = 5;

export default class todoViewModel {
  todos = [];
  text = '';
  allCompleted = false;
  loading = false;
  page = 1;
  logReaction = null;

  get todoItems() {
    return this.todos.filter((element) =>
      this.allCompleted ? element['isCompleted'] : true,
    );
  }

  constructor() {
    makeObservable(this, {
      todos: observable,
      text: observable,
      allCompleted: observable,
      loading: observable,
      todoItems: computed,
      updateAddInputValue: action,
      addTodo: action,
      deleteTodo: action,
      editTodo: action,
      markTodo: action,
      allTodo: action,
      allDoneTodo: action,
      query: action,
    });
  }

  updateAddInputValue = (text) => {
    this.text = text;
  };

  addTodo = () => {
    const todo = {
      text: this.text,
      isCompleted: false,
      id: new Date().getTime(),
      todoItemViewModel: new TodoItemViewModel(),
    };
    this.todos.unshift(todo);
    this.text = '';
  };

  deleteTodo = (id) => {
    this.todos = this.todos.filter((element) => element['id'] !== id);
  };

  editTodo = (id, text) => {
    const index = this.todos.map((element) => element['id']).indexOf(id);
    this.todos[index].text = text;
  };
  markTodo = (id) => {
    const index = this.todos.map((element) => element['id']).indexOf(id);
    this.todos[index].isCompleted = !this.todos[index].isCompleted;
  };

  allTodo = () => {
    this.allCompleted = false;
  };

  allDoneTodo = () => {
    this.allCompleted = true;
  };

  query = async () => {
    this.loading = true;
    const list = await delay(500).then(() => {
      const pageTodoStart = (this.page - 1) * 5;
      const pageTodoEnd = this.page * todosPerPage;
      return fakeData.slice(pageTodoStart, pageTodoEnd).map((elemnt) => ({
        ...elemnt,
        isCompleted: false,
        todoItemViewModel: new TodoItemViewModel(),
      }));
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
