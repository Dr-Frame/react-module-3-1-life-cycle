import React, { Component } from 'react';
import shortid from 'shortid';
import Counter from './components/Counter';
import Dropdown from './components/Dropdown';
import ColorPicker from './components/ColorPicker';
import TodoList from './components/TodoList';
import Filter from './components/Filter/Filter';
import TodoEditor from './components/TodoEditor/';
import initialTodos from './todos.json';
import Form from './components/Form';
//импортим картинку как реакт компонент
import { ReactComponent as AddIcon } from './icons/add.svg';
import Modal from './components/Modal';
import Clock from './components/Clock';
import Tabs from './components/Tabs/Tabs';
import tabData from './tabs.json';
import IconButton from './components/IconButton/IconButton';

const colorPickerOptions = [
  { label: 'red', color: '#F44336' },
  { label: 'green', color: '#4CAF50' },
  { label: 'blue', color: '#2196F3' },
  { label: 'grey', color: '#607D8B' },
  { label: 'pink', color: '#E91E63' },
  { label: 'indigo', color: '#3F51B5' },
];

class App extends Component {
  // структура!!!
  // 1. state
  // 2. методы жизненного цикла
  // 3. кастомные методы мои
  // 4. рендер()

  state = {
    //todos: initialTodos,
    todos: [],
    filter: '',
    showModal: false,
  };

  //вызывается один раз при маунте компонента
  componentDidMount() {
    //console.log('app didMount');
    const localStorageTodos = localStorage.getItem('todos');
    const parseTodos = JSON.parse(localStorageTodos);
    console.log(parseTodos);

    if (parseTodos) {
      this.setState({
        todos: parseTodos,
      });
    }
  }

  //вызывается при каждом обновлении компонента
  componentDidUpdate(prevProps, prevState) {
    //console.log('app didUpdate');

    //нельзя внутри setState исполльзовать, создадим бесконечный цикл

    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      /* console.log('todos was updated'); */

      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }

    //вариант с модалкой закрытием
    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
  }

  addTodo = text => {
    console.log(text);

    const todo = {
      id: shortid.generate(),
      //аналогичная записи text: text
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));

    //другой вариант в методе didUpdate смотерть
    /* this.toggleModal(); */
  };

  deleteTodo = todoID => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoID),
    }));
  };

  toggleCompleted = todoID => {
    console.log(todoID);

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === todoID) {
          console.log('found needed todo');
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  };

  formSubmitHandler = data => {
    console.log(data);
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getVisibleTodos = () => {
    const { todos, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  getCompletedTodoCount = () => {
    return this.state.todos.reduce(
      (acc, todo) => (todo.completed ? acc + 1 : acc),
      0,
    );
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { todos, filter, showModal } = this.state;

    const completedTodo = this.getCompletedTodoCount();

    const visibleTodos = this.getVisibleTodos();

    return (
      <React.Fragment>
        {/* <Tabs items={tabData} /> */}

        <IconButton onClick={this.toggleModal} aria-label="Add todo">
          <AddIcon width="50" height="50" fill="white" />
        </IconButton>
        {/* <button type="button" onClick={this.toggleModal}>
          Open modal
        </button> */}

        {showModal && (
          <Modal modalClose={this.toggleModal}>
            {/* <button type="button" onClick={this.toggleModal}>
              Close
            </button>
            <h2>This is children bro</h2>
            <p>
              lorem5fsdfdsffdfvkmksdmvklmfllkvkfdvlkmfvlkmsdfvmdlmvldfvmlfsdfdsfdfdf
            </p> */}
            <TodoEditor addTodo={this.addTodo} />
          </Modal>
        )}

        {/* <Form submit={this.formSubmitHandler} /> */}

        {/* <Counter initialValue={15} />
        <Dropdown />
        <ColorPicker options={colorPickerOptions} /> */}
        <div>
          <p>Общее кол-во: {todos.length}</p>
          <p>Количество выполненых: {completedTodo}</p>
        </div>

        <Filter filter={filter} changeFilter={this.changeFilter} />
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </React.Fragment>
    );
  }
}

export default App;
